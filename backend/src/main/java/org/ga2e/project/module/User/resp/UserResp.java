package org.ga2e.project.module.User.resp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserResp {
  private Long id;
  private String code;
  private String email;
  private String phone;
  private RoleResp role;

}
