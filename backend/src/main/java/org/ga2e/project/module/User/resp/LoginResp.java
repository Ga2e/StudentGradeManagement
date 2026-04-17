package org.ga2e.project.module.User.resp;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class LoginResp<T extends UserResp> {

  private String token;
  private String tokenType;
  private T user;

}
