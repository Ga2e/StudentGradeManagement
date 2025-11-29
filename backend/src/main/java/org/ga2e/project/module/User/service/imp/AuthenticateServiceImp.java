package org.ga2e.project.module.User.service.imp;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

import org.ga2e.project.common.response.ApiResult;
import org.ga2e.project.common.utils.JwtUtil;
import org.ga2e.project.module.User.dto.LoginDTO;
import org.ga2e.project.module.User.entity.User;
import org.ga2e.project.module.User.mapper.UserMapper;
import org.ga2e.project.module.User.resp.LoginResp;
import org.ga2e.project.module.User.resp.StudentResp;
import org.ga2e.project.module.User.resp.TeacherResp;
import org.ga2e.project.module.User.resp.UserResp;
import org.ga2e.project.module.User.service.AuthenticateService;
import org.springframework.data.redis.core.BoundValueOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/*
 *
 * Jwt 认证 Jwi 黑名单
 * 基于Redis 实现
 * key: blacklist:{jti} value: "1"
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AuthenticateServiceImp implements AuthenticateService {
  private final AuthenticationManager authenticationManager;
  private final JwtUtil jwtUtil;
  private final UserMapper userMapper;
  private final RedisTemplate redisTemplate;

  @Override
  public ApiResult<?> login(LoginDTO logindto) {
    UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(logindto.getUsername(),
        logindto.getPassword());

    // 认证
    Authentication authenticate = authenticationManager.authenticate(token);

    boolean isAuth = authenticate.getAuthorities().stream()
        .anyMatch(grant -> grant.getAuthority().contains(logindto.getRole()));
    if (!isAuth) {
      throw new UsernameNotFoundException("user type not matching");

    }

    // 构建响应
    User user = (User) authenticate.getPrincipal();
    String jti = UUID.randomUUID().toString();
    String jwt = jwtUtil.generateJwt(user, jti);

    LoginResp loginResp = LoginResp.builder()
        .token(jwt)
        .tokenType("Bearer")
        .build();

    // 根据角色构建对应的响应，其中Profile 为特有属性
    if (user.getRole().getName().contains("teacher")) {
      TeacherResp userResp = userMapper.toTeacherResp(user);
      loginResp.setUser(userResp);
    } else if (user.getRole().getName().contains("student")) {
      StudentResp userResp = userMapper.toStudentResp(user);
      loginResp.setUser(userResp);
    } else {
      UserResp resp = userMapper.toResp(user);
      loginResp.setUser(resp);
    }

    return ApiResult.success(loginResp);
  }

  @Override
  public ApiResult<?> logout(HttpServletRequest request) {

    SecurityContextHolder.clearContext();
    String token = jwtUtil.extraToken(request);
    String jti = jwtUtil.getClaimFromToken(token, Claims::getId);
    Long remainomgTimeInMillis = jwtUtil.getRemainomgTimeInMillis(token);

    BoundValueOperations boundValueOps = redisTemplate.boundValueOps("blacklist:" + jti);
    boundValueOps.set("1");
    boundValueOps.expire(remainomgTimeInMillis, TimeUnit.SECONDS);

    return ApiResult.success();
  }

}
