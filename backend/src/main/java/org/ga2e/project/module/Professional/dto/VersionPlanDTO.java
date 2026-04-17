package org.ga2e.project.module.Professional.dto;

import lombok.Data;

import java.util.List;

@Data
public class VersionPlanDTO {

  private Long id;
  private String versionNumber;
  private String description;
  private Long professionalId;
  private List<VersionPlanCourseDTO> courses;

  @Data
  public static class VersionPlanCourseDTO {
    private Long courseId;
    private Integer semester;
  }

}
