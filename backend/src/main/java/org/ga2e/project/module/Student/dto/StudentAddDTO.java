package org.ga2e.project.module.Student.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentAddDTO {

  private String code;

  private String email;

  private String phone;

  private String password;

  private StudentProfileAddDTO studentProfileAddDTO;

}
