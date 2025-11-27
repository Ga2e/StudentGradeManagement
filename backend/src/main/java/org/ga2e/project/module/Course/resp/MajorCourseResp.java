package org.ga2e.project.module.Course.resp;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MajorCourseResp {
  private Long id;
  private Long classId;

  private Long courseId;

  private Long termId;

  private LocalDateTime createdAt;

  private LocalDateTime updatedAt;

}
