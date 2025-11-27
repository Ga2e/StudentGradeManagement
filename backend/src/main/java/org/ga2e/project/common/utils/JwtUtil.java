
package org.ga2e.project.common.utils;

import org.ga2e.project.module.User.entity.Permission;
import org.ga2e.project.module.User.entity.Role;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Optional;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.ga2e.project.module.User.entity.User;
import org.ga2e.project.module.User.entity.Permission.PermissionBuilder;
import org.ga2e.project.module.User.entity.Permission.PermissionBuilder;
import org.ga2e.project.module.User.repo.UserRepo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/*
 *  Jwt API，用于用户的 JWT 生成 验证等操作
 *
 * */
@Component
@RequiredArgsConstructor
@Slf4j

public class JwtUtil {

  @Value("${jwt.secret}")
  private String secret;

  @Value("${jwt.expire-time}")
  private Long expireTime;

  @Value("${jwt.refresh-time}")
  private Long refreshTime;

  @Value("${jwt.issure}")
  private String issure;

  /*
   * 密钥以BASE64 的形式保存，在签名之前需要解码
   *
   */
  private SecretKey getSigningKey() {
    byte[] decode = Decoders.BASE64.decode(secret);
    return Keys.hmacShaKeyFor(decode);

  }

  public String generateJwt(User user, String jti) {

    Date now = new Date();
    Date expiryDate = new Date(now.getTime() + expireTime * 1000);

    return Jwts.builder()
        .issuer(issure)
        .issuedAt(now)
        .id(jti)
        .subject(user.getUsername())
        .claim("id", user.getId())
        .claim("role", user.getRole().getName())
        .claim("permission", user.getRole().getPermissions().stream()
            .map(Permission::getName)
            .toList())
        .expiration(expiryDate)
        .signWith(getSigningKey())
        .compact();
  }

  public String extraToken(HttpServletRequest request) {
    String authHeader = request.getHeader("Authorization");
    if (authHeader.startsWith("Bearer ")) {
      return authHeader.substring(7);
    }
    throw new JwtException("user credit error ");
  }

  // 从jwt 中提取user id 从repo 中获取 user
  // 本不应该是这样，user 中应该将权限从role 中分离成为一个字段
  // 这样，序列化和反序列化时才能有效果
  public User parseToken(String token) {
    Claims payload = Jwts.parser()
        .verifyWith(getSigningKey())
        .build()
        .parseSignedClaims(token)
        .getPayload();

    Long id = payload.get("id", Long.class);
    String roleName = payload.get("role", String.class);
    List<String> permissionName = payload.get("permission", List.class);
    List<Permission> permissions = new ArrayList<>();

    for (String p : permissionName) {
      Permission temp = Permission.builder()
          .name(p)
          .build();
      permissions.add(temp);
    }

    Role role = Role.builder()
        .name(roleName)
        .permissions(permissions)
        .build();

    return User.builder()
        .id(id)
        .role(role)
        .build();

  }

  public String generateRefreshToken(User user, String jti) {
    return generateJwt(user, jti);
  }

  public Boolean validateToken(String token, String username) {
    final String tokenUsername = getClaimFromToken(token, Claims::getSubject);
    return tokenUsername.equals(username) && !isTokenExpired(token);
  }

  // 检查JWT令牌是否过期
  private Boolean isTokenExpired(String token) {
    final Date expiration = getExpireTime(token);
    return expiration.before(new Date());
  }

  public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = getAllClaimsFromToken(token);
    return claimsResolver.apply(claims); // 小写 c，变量名要一致！
  }

  private Claims getAllClaimsFromToken(String token) {
    return Jwts.parser()
        .verifyWith(getSigningKey())
        .build()
        .parseSignedClaims(token)
        .getPayload();
  }

  // 获取token 过期时间
  public Date getExpireTime(String token) {

    return getClaimFromToken(token, Claims::getExpiration);
  }

  // 获取token 过期剩余时间
  public Long getRemainomgTimeInMillis(String token) {
    return getExpireTime(token).getTime() - System.currentTimeMillis();
  }
}
