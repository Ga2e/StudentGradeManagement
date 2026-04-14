package org.ga2e.project.module.Student.mapper;

import java.util.List;

import org.ga2e.project.module.Student.dto.StudentAddDTO;
import org.ga2e.project.module.Student.dto.StudentProfileAddDTO;
import org.ga2e.project.module.Student.dto.StudentProfileUpdateDTO;
import org.ga2e.project.module.Student.entity.StudentProfile;
import org.ga2e.project.module.Student.resp.StudentProfileResp;
import org.ga2e.project.module.User.entity.User;
import org.ga2e.project.module.User.mapper.UserMapper;
import org.ga2e.project.module.User.resp.StudentResp;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring", uses = UserMapper.class)
public interface StudentMapper {

  @Mapping(target = "studentProfile", source = "studentProfile")
  StudentResp toStudentResp(User user);

  StudentProfileResp studentProfileEntityToResp(StudentProfile studentProfile);

  default List<StudentResp> toListResp(List<User> user) {
    List<StudentResp> res = user.stream()
        .map(this::toStudentResp)
        .toList();
    return res;
  }

  default Page<StudentResp> toPageReps(Page<User> users) {
    return users
        .map(this::toStudentResp);

  }

  @Mapping(target = "user", ignore = true)
  StudentProfile profileUpdateDtoToEntity(StudentProfileUpdateDTO studentProfileUpdateDTO);

  @Mapping(target = "user", ignore = true)
  @Mapping(target = "userId", ignore = true)
  StudentProfile profileAddDtoToEntity(StudentProfileAddDTO studentProfileAddDTO);

  List<User> profileAddDtoListToEntityList(List<StudentAddDTO> studentAddDTOs);

  @Mapping(target = "studentProfile", source = "studentProfile")
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "role", ignore = true)
  @Mapping(target = "teacherProfile", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  User studentAddDtoToEntity(StudentAddDTO studentAddDTO);

}
