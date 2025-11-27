package org.ga2e.project.module.Course.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ElectCourseDTO {
  private Long userId; // 学生

  private Long courseId; // 课程

  private Long termId; // 学期

}
