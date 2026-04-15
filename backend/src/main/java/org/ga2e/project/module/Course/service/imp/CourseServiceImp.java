package org.ga2e.project.module.Course.service.imp;

import java.util.List;

import org.ga2e.project.common.constant.CourseType;
import org.ga2e.project.module.Course.dto.CourseAddDTO;
import org.ga2e.project.module.Course.dto.CourseUpdateDTO;
import org.ga2e.project.module.Course.entity.Course;
import org.ga2e.project.module.Course.mapper.CourseMapper;
import org.ga2e.project.module.Course.repo.CourseRepo;
import org.ga2e.project.module.Course.resp.CourseResp;
import org.ga2e.project.module.Course.service.CourseService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CourseServiceImp implements CourseService {

  private final CourseRepo courseRepo;
  private final CourseMapper courseMapper;

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

  @Override
  public void batchAdd(List<CourseAddDTO> courseAddDTOs) {
    List<Course> courses = courseMapper.addDtosToEntitys(courseAddDTOs);
    courseRepo.saveAll(courses);

  }

}
