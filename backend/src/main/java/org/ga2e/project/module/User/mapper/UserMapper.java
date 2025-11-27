package org.ga2e.project.module.User.mapper;

import org.ga2e.project.module.User.entity.User;
import org.ga2e.project.module.User.resp.StudentResp;
import org.ga2e.project.module.User.resp.TeacherResp;
import org.ga2e.project.module.User.resp.UserResp;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", uses = RoleMapper.class)
public interface UserMapper {

  UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

  @Mapping(target = "role", source = "role")
  UserResp toResp(User user);

  default TeacherResp toTeacherResp(User user) {
    return (TeacherResp) toResp(user);
  }

  default StudentResp toStudentResp(User user) {
    return (StudentResp) toResp(user);

  }

}
