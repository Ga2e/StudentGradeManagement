package org.ga2e.project.module.User.resp;

import org.ga2e.project.module.Student.entity.StudentProfile;
import org.ga2e.project.module.Student.resp.StudentProfileResp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class StudentResp extends UserResp {
  private StudentProfileResp studentProfile;

}
