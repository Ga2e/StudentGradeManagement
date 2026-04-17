package org.ga2e.project.module.Student.dto;

import org.ga2e.project.module.User.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentUpdateDTO {
  private Long id;
  private String email;

  private String phone;

  private String password;

}
