package org.ga2e.project.common.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum RoleEnum {
  ADMIN(Long.valueOf(1)),
  TEACHER(Long.valueOf(2)),
  STUDENT(Long.valueOf(3));

  private final Long id;
}
