package org.ga2e.project.module.Course.mapper;

import java.util.List;

import org.ga2e.project.module.Course.dto.CourseAddDTO;
import org.ga2e.project.module.Course.dto.CourseUpdateDTO;
import org.ga2e.project.module.Course.entity.Course;
import org.ga2e.project.module.Course.mapper.decorator.CourseDecorator;
import org.ga2e.project.module.Course.resp.CourseResp;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring", uses = CourseDecorator.class)
public interface CourseMapper {

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  Course addDtoToEntity(CourseAddDTO courseAddDTO);

  List<Course> addDtosToEntitys(List<CourseAddDTO> courseAddDTO);

  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "type", ignore = true)
  Course updateDtoToEntity(CourseUpdateDTO courseUpdateDTO);

  CourseResp entityToResp(Course course);

  List<CourseResp> entitysToResps(List<Course> courses);

  default Page<CourseResp> entitysToResps(Page<Course> courses) {
    return courses
        .map(this::entityToResp);

  }

}
