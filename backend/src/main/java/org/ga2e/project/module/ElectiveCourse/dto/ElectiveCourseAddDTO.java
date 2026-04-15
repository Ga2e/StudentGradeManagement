package org.ga2e.project.module.ElectiveCourse.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ElectiveCourseAddDTO {

  @NotNull(message = "课程ID不能为空")
  private Long courseId;

  @NotNull(message = "学期ID不能为空")
  private Long termId;

}
