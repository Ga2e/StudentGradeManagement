package org.ga2e.project.module.User.resp;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RoleResp {

  private Long id;
  private String name;
  private List<PermissionResp> permissions;
}
