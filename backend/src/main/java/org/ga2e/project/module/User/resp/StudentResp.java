package org.ga2e.project.module.User.resp;

import org.ga2e.project.module.Student.entity.StudentProfile;
import org.ga2e.project.module.User.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentResp extends UserResp {
  private StudentProfile studentProfile;

}
