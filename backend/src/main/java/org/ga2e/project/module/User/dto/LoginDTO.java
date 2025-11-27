package org.ga2e.project.module.User.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class LoginDTO {

  private String username;
  private String password;
  private String role;
}
