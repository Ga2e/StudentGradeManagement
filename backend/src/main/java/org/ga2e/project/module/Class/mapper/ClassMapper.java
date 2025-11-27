package org.ga2e.project.module.Class.mapper;

import java.util.List;

import org.ga2e.project.module.Class.dto.ClassAddDTO;
import org.ga2e.project.module.Class.dto.ClassUpdateDTO;
import org.ga2e.project.module.Class.entity.Class;
import org.ga2e.project.module.Class.mapper.decorator.ClassDecorator;
import org.ga2e.project.module.Class.resp.ClassResp;
import org.ga2e.project.module.Course.entiry.MajorCourse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring", uses = ClassDecorator.class)
public interface ClassMapper {

  ClassMapper INSTANCE = Mappers.getMapper(ClassMapper.class);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "courses", ignore = true)
  @Mapping(target = "professional", source = "professionalId")
  public Class AddToEntity(ClassAddDTO classAddDTO);

  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "courses", ignore = true)
  @Mapping(target = "professional", source = "professionalId")
  public Class UpdateToEntity(ClassUpdateDTO classUpdateDTO);

  public List<Class> listAddDTOToEntitys(List<ClassAddDTO> classAddDTOs);

  @Mapping(target = "professionalId", source = "professional.id")
  @Mapping(target = "courseIds", source = "courses", qualifiedByName = "majorCourseToCourseId")
  public ClassResp entityToResp(Class clazz);

  public List<ClassResp> entitysToResps(List<Class> classs);

  default Page<ClassResp> entitysToResps(Page<Class> iPage) {
    return iPage.map(this::entityToResp);
  };

  @Named("majorCourseToCourseId")
  default Long majorCourseToCourseId(MajorCourse majorCourse) {
    return majorCourse.getId();
  }

}
