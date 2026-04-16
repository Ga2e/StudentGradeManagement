package org.ga2e.project.module.Grade.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GradeAddDTO {

  private Long studentId;

  private Long courseId;

  private BigDecimal score;

}
