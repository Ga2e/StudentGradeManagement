package org.ga2e.project.module.Teacher.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeacherAddDTO {

  private String code;

  private String email;

  private String phone;

  private String password;

  private TeacherProfileAddDTO teacherProfile;

}
