package org.ga2e.project.module.Teacher.mapper;

import java.util.List;

import org.ga2e.project.module.Teacher.dto.TeacherAddDTO;
import org.ga2e.project.module.Teacher.dto.TeacherProfileAddDTO;
import org.ga2e.project.module.Teacher.dto.TeacherProfileUpdateDTO;
import org.ga2e.project.module.Teacher.entity.TeacherProfile;
import org.ga2e.project.module.Teacher.resp.TeacherProfileResp;
import org.ga2e.project.module.User.entity.User;
import org.ga2e.project.module.User.mapper.UserMapper;
import org.ga2e.project.module.User.resp.TeacherResp;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring", uses = UserMapper.class)
public interface TeacherMapper {

  @Mapping(target = "teacherProfile", source = "teacherProfile")
  TeacherResp toTeacherResp(User user);

  TeacherProfileResp teacherProfileEntityToResp(TeacherProfile teacherProfile);

  default List<TeacherResp> toListResp(List<User> user) {
    List<TeacherResp> res = user.stream()
        .map(this::toTeacherResp)
        .toList();
    return res;
  }

  default Page<TeacherResp> toPageReps(Page<User> users) {
    return users
        .map(this::toTeacherResp);

  }

  @Mapping(target = "user", ignore = true)
  TeacherProfile profileUpdateDtoToEntity(TeacherProfileUpdateDTO teacherProfileUpdateDTO);

  @Mapping(target = "user", ignore = true)
  @Mapping(target = "userId", ignore = true)
  TeacherProfile profileAddDtoToEntity(TeacherProfileAddDTO teacherProfileAddDTO);

  List<User> profileAddDtoListToEntityList(List<TeacherAddDTO> teacherAddDTOs);

  @Mapping(target = "teacherProfile", source = "teacherProfile")
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "role", ignore = true)
  @Mapping(target = "studentProfile", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  User teacherAddDtoToEntity(TeacherAddDTO teacherAddDTO);

}
