package org.ga2e.project.module.Grade.resp;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudentGradeResp {
  private List<GradeResp> majors;
  private List<GradeResp> electives;
}
