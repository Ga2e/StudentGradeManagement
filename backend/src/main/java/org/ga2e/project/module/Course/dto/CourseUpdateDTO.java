package org.ga2e.project.module.Course.dto;

import java.math.BigDecimal;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseUpdateDTO {
  private Long id;

  private String code;

  private String name;

  private List<Long> teacherIds;

  private BigDecimal credits;

  private Integer hours;

}
