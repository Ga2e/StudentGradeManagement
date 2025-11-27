package org.ga2e.project.module.Class.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddCoursesDTO {
  private Long classId;
  private List<Long> courseId;
  private Long termId;
}
