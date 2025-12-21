package org.ga2e.project.module.Teacher.service;

import java.util.List;

import org.ga2e.project.module.Teacher.dto.TeacherAddDTO;
import org.ga2e.project.module.Teacher.dto.TeacherProfileUpdateDTO;
import org.ga2e.project.module.Teacher.dto.TeacherUpdateDTO;
import org.ga2e.project.module.User.resp.TeacherResp;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface TeacherService {

  public List<TeacherResp> findAll();

  public Page<TeacherResp> pageQurey(Pageable pageable);

  public TeacherResp findById(Long id);

  public void deleteById(Long id);

  public void updateProfile(TeacherProfileUpdateDTO teacherUpdateDTO);

  public void add(TeacherAddDTO teacherAddDTO);

  public void batchAdd(List<TeacherAddDTO> teachers);

  void updateTeacher(TeacherUpdateDTO teacherUpdateDTO);

}
