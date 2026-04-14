package org.ga2e.project.module.Class.dto;

import org.ga2e.project.common.constant.ClassType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClassAddDTO {
  private String name;
  private ClassType type;

  private Long year;

  private Long professionalId;

}
