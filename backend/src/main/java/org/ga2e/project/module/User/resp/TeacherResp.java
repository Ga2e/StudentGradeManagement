package org.ga2e.project.module.User.resp;

import org.ga2e.project.module.Teacher.entity.TeacherProfile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeacherResp extends UserResp {
  private TeacherProfile teacherProfile;

}
