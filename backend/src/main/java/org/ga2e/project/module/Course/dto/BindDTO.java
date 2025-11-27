package org.ga2e.project.module.Course.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BindDTO {
  private Long classId;

  private Long courseId;

  private Long termId;

}
