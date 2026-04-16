package org.ga2e.project.module.User.mapper;

import java.util.List;

import org.ga2e.project.module.User.entity.Permission;
import org.ga2e.project.module.User.resp.PermissionResp;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface PermissionMapper {
  PermissionMapper INSTANCE = Mappers.getMapper(PermissionMapper.class);

  PermissionResp toResp(Permission permission);

  List<PermissionResp> toRespList(List<Permission> permissions);
}
