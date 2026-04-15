package org.ga2e.project.module.Class.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ComposeCoursesDTO {
  private Long classId;
  private List<Long> courseId;
  private String name;
}
