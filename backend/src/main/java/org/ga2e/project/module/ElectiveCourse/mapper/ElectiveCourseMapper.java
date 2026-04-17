package org.ga2e.project.module.ElectiveCourse.mapper;

import org.ga2e.project.module.ElectiveCourse.dto.ElectiveCourseAddDTO;
import org.ga2e.project.module.ElectiveCourse.entity.ElectiveCourse;
import org.ga2e.project.module.ElectiveCourse.resp.ElectiveCourseResp;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ElectiveCourseMapper {

  @Mapping(source = "dto.courseId", target = "courseId")
  @Mapping(source = "dto.termId", target = "termId")
  @Mapping(source = "userId", target = "userId")
  ElectiveCourse addDtoToEntity(ElectiveCourseAddDTO dto, Long userId);

  ElectiveCourseResp entityToResp(ElectiveCourse entity);

}
