package org.ga2e.project.common.constant;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum RoleEnum {
  ADMIN(new SimpleGrantedAuthority("ROLE_ADMIN")),
  TEACHER(new SimpleGrantedAuthority("ROLE_TEACHER")),
  STUDENT(new SimpleGrantedAuthority("ROLE_STUDENT"));

  private final SimpleGrantedAuthority simpleGrantedAuthority;
}
