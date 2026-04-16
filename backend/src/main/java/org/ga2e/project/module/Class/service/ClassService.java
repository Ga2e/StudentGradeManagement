package org.ga2e.project.module.Class.service;

import java.util.List;

import org.ga2e.project.module.Class.dto.ClassAddDTO;
import org.ga2e.project.module.Class.dto.ClassUpdateDTO;
import org.ga2e.project.module.Class.dto.ComposeCoursesDTO;
import org.ga2e.project.module.Class.entity.Class;
import org.ga2e.project.module.Class.pojo.ClassCourseId;
import org.ga2e.project.module.Class.resp.ClassResp;
import org.ga2e.project.module.Course.resp.CourseResp;
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

  public void composeCourses(ComposeCoursesDTO addCoursesDTO);

  public void deleteCourse(ClassCourseId id);

  public List<CourseResp> getCourseByClassId(Long id);

  public List ComposeTeacher();
}
