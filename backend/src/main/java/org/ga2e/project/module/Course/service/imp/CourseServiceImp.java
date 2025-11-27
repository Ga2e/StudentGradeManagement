package org.ga2e.project.module.Course.service.imp;

import java.util.List;

import org.ga2e.project.module.Course.dto.BindDTO;
import org.ga2e.project.module.Course.dto.CourseAddDTO;
import org.ga2e.project.module.Course.dto.CourseUpdateDTO;
import org.ga2e.project.module.Course.dto.ElectCourseDTO;
import org.ga2e.project.module.Course.dto.UpdateBindDTO;
import org.ga2e.project.module.Course.entiry.Course;
import org.ga2e.project.module.Course.entiry.ElectiveCourse;
import org.ga2e.project.module.Course.entiry.MajorCourse;
import org.ga2e.project.module.Course.mapper.CourseMapper;
import org.ga2e.project.module.Course.repo.CourseRepo;
import org.ga2e.project.module.Course.repo.ElectiveCourseRepo;
import org.ga2e.project.module.Course.repo.MajorCourseRepo;
import org.ga2e.project.module.Course.resp.CourseResp;
import org.ga2e.project.module.Course.resp.MajorCourseResp;
import org.ga2e.project.module.Course.service.CourseService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CourseServiceImp implements CourseService {

  private final CourseRepo courseRepo;
  private final ElectiveCourseRepo electiveCourseRepo;
  private final CourseMapper courseMapper;
  private final MajorCourseRepo majorCourseRepo;

  @Override
  public List<CourseResp> findAll() {
    List<Course> all = courseRepo.findAll();
    List<CourseResp> entitysToResps = courseMapper.entitysToResps(all);
    return entitysToResps;
  }

  @Override
  public Page<CourseResp> pageQurey(Pageable pageable) {
    Page<Course> all = courseRepo.findAll(pageable);
    Page<CourseResp> entitysToResps = courseMapper.entitysToResps(all);
    return entitysToResps;

  }

  @Override
  public CourseResp findById(Long id) {
    Course course = courseRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("course not exist"));
    CourseResp courseResp = courseMapper.entityToResp(course);
    return courseResp;

  }

  @Override
  public void deleteById(Long id) {
    courseRepo.deleteById(id);
  }

  @Override
  public void update(CourseUpdateDTO courseUpdateDTO) {
    Course updateDtoToEntity = courseMapper.updateDtoToEntity(courseUpdateDTO);
    courseRepo.save(updateDtoToEntity);
  }

  @Override
  public void add(CourseAddDTO courseAddDTO) {
    Course course = courseMapper.addDtoToEntity(courseAddDTO);
    courseRepo.save(course);

  }

  public void batchAdd(List<CourseAddDTO> courseAddDTOs) {
    List<Course> courses = courseMapper.addDtosToEntitys(courseAddDTOs);
    courseRepo.saveAll(courses);

  }

  @Override
  public void electCourse(ElectCourseDTO electCourseDTO) {
    ElectiveCourse electDtoToEntity = courseMapper.electDtoToEntity(electCourseDTO);
    electiveCourseRepo.save(electDtoToEntity);
  }

  @Override
  @Transactional
  public void bindClassToMajor(BindDTO bindClassToMajorDTO) {
    MajorCourse majorCourse = courseMapper.bindDtoToEntity(bindClassToMajorDTO);
    majorCourseRepo.save(majorCourse);
  }

  @Override
  public void deleteBind(Long id) {
    majorCourseRepo.deleteById(id);
  }

  @Override
  public void updateBind(UpdateBindDTO updateBindDto) {
    MajorCourse updateBindDtoToEntity = courseMapper.updateBindDtoToEntity(updateBindDto);
    majorCourseRepo.save(updateBindDtoToEntity);
  }

  @Override
  public MajorCourseResp findAllById(Long id) {
    MajorCourse majorCourse = majorCourseRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("Major course not exist"));

    MajorCourseResp majorCourseResp = courseMapper.entityToMajorResp(majorCourse);
    return majorCourseResp;
  }

  @Override
  public List<MajorCourseResp> findBindById(List<Long> ids) {
    List<MajorCourse> majorCourse = majorCourseRepo.findAllById(ids);

    List<MajorCourseResp> majorCourseResp = courseMapper.entitysToMajorResps(majorCourse);
    return majorCourseResp;
  }

}
