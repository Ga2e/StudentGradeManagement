package org.ga2e.project.module.Grade.mapper;

import java.util.List;

import org.ga2e.project.module.Course.mapper.CourseMapper;
import org.ga2e.project.module.Grade.dto.GradeAddDTO;
import org.ga2e.project.module.Grade.dto.GradeUpdateDTO;
import org.ga2e.project.module.Grade.entity.Grade;
import org.ga2e.project.module.Grade.mapper.decorator.GradeDecorator;
import org.ga2e.project.module.Grade.resp.GradeResp;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring", uses = { GradeDecorator.class, CourseMapper.class })
public interface GradeMapper {

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "student", source = "studentId")
  @Mapping(target = "course", source = "courseId")
  public Grade AddToEntity(GradeAddDTO gradeAddDTO);

  public List<Grade> listAddDTOToEntitys(List<GradeAddDTO> gradeAddDTOs);

  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "student", source = "studentId")
  @Mapping(target = "course", source = "courseId")
  public Grade UpdateToEntity(GradeUpdateDTO gradeUpdateDTO);

  @Mapping(target = "course", source = "course")
  public GradeResp entityToResp(Grade grade);

  public List<GradeResp> entitysToResps(List<Grade> grades);

  default Page<GradeResp> entitysToResps(Page<Grade> iPage) {
    return iPage.map(this::entityToResp);
  };

}
