package org.ga2e.project.module.Professional.dto;

import java.util.List;

import lombok.Data;

@Data
public class ProfessionalPlanDTO {
  private Long professionalId;
  private List<Long> courseIds;
  private List<Integer> semesters;
  private String version;
  private String grade;
}
