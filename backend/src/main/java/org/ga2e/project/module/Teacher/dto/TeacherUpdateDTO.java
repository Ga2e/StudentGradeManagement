package org.ga2e.project.module.Teacher.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TeacherUpdateDTO {
  private Long id;
  private String email;

  private String phone;

  private String password;

}
