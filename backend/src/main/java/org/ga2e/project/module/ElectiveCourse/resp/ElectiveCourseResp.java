package org.ga2e.project.module.ElectiveCourse.resp;

import org.ga2e.project.module.Course.resp.CourseResp;
import org.ga2e.project.module.Term.resp.TermResp;
import lombok.Data;

@Data
public class ElectiveCourseResp {

  private Long id;
  private CourseResp course;
  private TermResp term;
  private String createdAt;

}
