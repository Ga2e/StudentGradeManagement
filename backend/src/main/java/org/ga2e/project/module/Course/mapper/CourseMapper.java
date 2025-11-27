package org.ga2e.project.module.Course.mapper;

import java.util.List;

import org.ga2e.project.module.Course.dto.BindDTO;
import org.ga2e.project.module.Course.dto.CourseAddDTO;
import org.ga2e.project.module.Course.dto.CourseUpdateDTO;
import org.ga2e.project.module.Course.dto.ElectCourseDTO;
import org.ga2e.project.module.Course.dto.UpdateBindDTO;
import org.ga2e.project.module.Course.entiry.Course;
import org.ga2e.project.module.Course.entiry.ElectiveCourse;
import org.ga2e.project.module.Course.entiry.MajorCourse;
import org.ga2e.project.module.Course.mapper.decorator.CourseDecorator;
import org.ga2e.project.module.Course.resp.CourseResp;
import org.ga2e.project.module.Course.resp.MajorCourseResp;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring", uses = CourseDecorator.class)
public interface CourseMapper {

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "teachers", ignore = true)
  Course addDtoToEntity(CourseAddDTO courseAddDTO);

  List<Course> addDtosToEntitys(List<CourseAddDTO> courseAddDTO);

  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "teachers", source = "teacherIds")
  Course updateDtoToEntity(CourseUpdateDTO courseUpdateDTO);

  @Mapping(target = "teachers", source = "teachers")
  CourseResp entityToResp(Course course);

  List<CourseResp> entitysToResps(List<Course> courses);

  default Page<CourseResp> entitysToResps(Page<Course> courses) {
    return courses
        .map(this::entityToResp);

  }

  // ElectiveCourse

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "createdAt", ignore = true)
  @Mapping(target = "updatedAt", ignore = true)
  @Mapping(target = "user", source = "userId")
  @Mapping(target = "course", source = "courseId")
  ElectiveCourse electDtoToEntity(ElectCourseDTO electCourseDTO);

  // MajorCourse

  @Mapping(target = "classId", source = "class.id")
  @Mapping(target = "courseId", source = "course.id")
  @Mapping(target = "termId", source = "term.id")
  MajorCourseResp entityToMajorResp(MajorCourse majorCourse);

  List<MajorCourseResp> entitysToMajorResps(List<MajorCourse> majorCourse);

  @Mapping(target = "class", source = "classId")
  @Mapping(target = "course", source = "courseId")
  @Mapping(target = "term", source = "termId")
  MajorCourse bindDtoToEntity(BindDTO bindMajorToEntity);

  @Mapping(target = "class", source = "classId")
  @Mapping(target = "course", source = "courseId")
  @Mapping(target = "term", source = "termId")
  MajorCourse updateBindDtoToEntity(UpdateBindDTO updateBindDTO);

}
