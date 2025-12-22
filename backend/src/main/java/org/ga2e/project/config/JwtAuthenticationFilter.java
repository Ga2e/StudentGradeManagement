
package org.ga2e.project.config;

import java.io.IOException;

import org.ga2e.project.common.utils.JwtUtil;
import org.ga2e.project.module.User.entity.User;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final JwtUtil jwtUtil;
  private final RedisTemplate redisTemplate;

  /*
   * 获取请求中的token
   * 合法且没有登陆过的token 进行用户身份存储
   *
   */
  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    // 开发模式
    try {

      String token = jwtUtil.extraToken(request);

      if (StringUtils.hasText(token)) {
        String jti = jwtUtil.getClaimFromToken(token, Claims::getId);

        // 是否在黑名单
        if (redisTemplate.hasKey("blacklist:" + jti)) {
          SecurityContextHolder.clearContext();
          filterChain.doFilter(request, response);
          return;
        }

        // 是否已经认证成功
        if (SecurityContextHolder.getContext().getAuthentication() == null) {

          User user = jwtUtil.parseToken(token);

          log.error(user.getAuthorities().toString());
          UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
              user, null, user.getAuthorities());
          authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
          SecurityContextHolder.getContext().setAuthentication(authenticationToken);

          log.info("Jwt authenticated success:{}", user.getCode());
        }
      }
    } catch (ExpiredJwtException e) {
      // token 错误
      log.debug("token expired");
      SecurityContextHolder.clearContext();

    } catch (RuntimeException e) {
      SecurityContextHolder.clearContext();

    }

    filterChain.doFilter(request, response);
  }

}
