package org.ga2e.project.module.User.mapper;

import org.ga2e.project.module.User.entity.User;
import org.ga2e.project.module.User.resp.UserResp;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = RoleMapper.class)
public interface UserMapper {

  @Mapping(target = "role", source = "role")
  UserResp toResp(User user);

}
