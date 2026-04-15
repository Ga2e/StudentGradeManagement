package org.ga2e.project.module.Professional.resp;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class GradePlanResp {

  private Long id;
  private String grade;
  private String revisionNotes;
  private Long versionPlanId;
  private String versionPlanNumber;
  private Long professionalId;
  private String professionalName;
  private List<GradePlanCourseResp> courses;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  @Data
  public static class GradePlanCourseResp {
    private Long id;
    private Long courseId;
    private String courseName;
    private String courseCode;
    private Integer semester;
    private Boolean isRevised;
    private String revisionReason;
  }

}
