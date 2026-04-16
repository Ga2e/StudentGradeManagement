package org.ga2e.project.module.Grade.resp;

import java.math.BigDecimal;

import org.ga2e.project.module.Course.resp.CourseResp;
import org.ga2e.project.module.User.resp.StudentResp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GradeResp {
  private Long id;

  private CourseResp course;
  private BigDecimal score;
  private StudentResp student;
}
