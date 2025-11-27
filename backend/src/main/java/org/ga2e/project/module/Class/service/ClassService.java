package org.ga2e.project.module.Class.service;

import java.util.List;

import org.ga2e.project.module.Class.dto.AddCoursesDTO;
import org.ga2e.project.module.Class.dto.ClassAddDTO;
import org.ga2e.project.module.Class.dto.ClassUpdateDTO;
import org.ga2e.project.module.Class.entity.Class;
import org.ga2e.project.module.Class.resp.ClassResp;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface ClassService {

  public List<ClassResp> findAll();

  public Page<ClassResp> pageQurey(Pageable pageable);

  public Class findById(Long id);

  public void deleteById(Long id);

  public void update(ClassUpdateDTO classUpdateDTO);

  public void add(ClassAddDTO classAddDTO);

  public void batchAdd(List<ClassAddDTO> classs);

  /*
   * 为班级添加多个Course
   */
  public void classAddCourses(AddCoursesDTO addCoursesDTO);
}
