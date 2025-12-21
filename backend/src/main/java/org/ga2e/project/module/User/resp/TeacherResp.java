package org.ga2e.project.module.User.resp;

import org.ga2e.project.module.Teacher.entity.TeacherProfile;
import org.ga2e.project.module.Teacher.resp.TeacherProfileResp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class TeacherResp extends UserResp {
  private TeacherProfileResp teacherProfile;

}
