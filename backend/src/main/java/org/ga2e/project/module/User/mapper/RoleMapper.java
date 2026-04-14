package org.ga2e.project.module.User.mapper;

import org.ga2e.project.module.User.entity.Role;
import org.ga2e.project.module.User.resp.RoleResp;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", uses = PermissionMapper.class)
public interface RoleMapper {
  RoleMapper roleMapper = Mappers.getMapper(RoleMapper.class);

  @Mapping(target = "permissions", source = "permissions")
  public RoleResp toResp(Role role);
}
