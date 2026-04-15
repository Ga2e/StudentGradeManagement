package org.ga2e.project.module.Professional.dto;

import lombok.Data;

import java.util.List;

@Data
public class GradePlanDTO {

  private Long id;
  private String grade;
  private String revisionNotes;
  private Long versionPlanId;
  private List<GradePlanCourseDTO> courses;

  @Data
  public static class GradePlanCourseDTO {
    private Long courseId;
    private Integer semester;
    private Boolean isRevised;
    private String revisionReason;
  }

}
