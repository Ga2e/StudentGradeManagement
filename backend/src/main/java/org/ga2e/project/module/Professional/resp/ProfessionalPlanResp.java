package org.ga2e.project.module.Professional.resp;

import java.util.List;

import lombok.Data;

@Data
public class ProfessionalPlanResp {
  private Long id;
  private String professionalName;
  private List<CourseInfo> courses;

  @Data
  public static class CourseInfo {
    private Long id;
    private String name;
    private String code;
    private Integer semester;
  }
}
