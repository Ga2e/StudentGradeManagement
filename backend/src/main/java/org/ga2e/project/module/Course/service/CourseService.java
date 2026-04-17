package org.ga2e.project.module.Course.service;

import java.util.List;

import org.ga2e.project.common.constant.CourseType;
import org.ga2e.project.module.Course.dto.CourseAddDTO;
import org.ga2e.project.module.Course.dto.CourseUpdateDTO;
import org.ga2e.project.module.Course.entity.Course;
import org.ga2e.project.module.Course.resp.CourseResp;
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

}
