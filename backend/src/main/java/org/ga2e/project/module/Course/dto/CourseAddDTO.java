package org.ga2e.project.module.Course.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseAddDTO {

  private String code;

  private String name;

  private BigDecimal credits;

  private Integer hours;
}
