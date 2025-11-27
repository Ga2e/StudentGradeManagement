package org.ga2e.project.module.Course.service;

import java.util.List;

import org.ga2e.project.module.Course.dto.BindDTO;
import org.ga2e.project.module.Course.dto.CourseAddDTO;
import org.ga2e.project.module.Course.dto.CourseUpdateDTO;
import org.ga2e.project.module.Course.dto.ElectCourseDTO;
import org.ga2e.project.module.Course.dto.UpdateBindDTO;
import org.ga2e.project.module.Course.resp.CourseResp;
import org.ga2e.project.module.Course.resp.MajorCourseResp;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface CourseService {
  public List<CourseResp> findAll();

  public Page<CourseResp> pageQurey(Pageable pageable);

  public CourseResp findById(Long id);

  public void deleteById(Long id);

  public void update(CourseUpdateDTO courseUpdateDTO);

  public void add(CourseAddDTO courseAddDTO);

  public void batchAdd(List<CourseAddDTO> courseAddDTOs);

  public void electCourse(ElectCourseDTO electCourseDTO);

  public void bindClassToMajor(BindDTO bindClassToMajorDTO);

  public void deleteBind(Long id);

  public void updateBind(UpdateBindDTO updateBindDto);

  public MajorCourseResp findAllById(Long id);

  public List<MajorCourseResp> findBindById(List<Long> id);

}
