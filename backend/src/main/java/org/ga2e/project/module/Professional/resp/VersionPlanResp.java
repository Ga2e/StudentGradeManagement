package org.ga2e.project.module.Professional.resp;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class VersionPlanResp {

  private Long id;
  private String versionNumber;
  private String description;
  private Long professionalId;
  private String professionalName;
  private List<VersionPlanCourseResp> courses;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  @Data
  public static class VersionPlanCourseResp {
    private Long id;
    private Long courseId;
    private String courseName;
    private String courseCode;
    private Integer semester;
  }

}
