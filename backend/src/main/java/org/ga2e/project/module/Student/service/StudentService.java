package org.ga2e.project.module.Student.service;

import java.util.List;

import org.ga2e.project.module.Student.dto.StudentAddDTO;
import org.ga2e.project.module.Student.dto.StudentProfileUpdateDTO;
import org.ga2e.project.module.Student.dto.StudentUpdateDTO;
import org.ga2e.project.module.User.resp.StudentResp;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface StudentService {

  public List<StudentResp> findAll();

  public Page<StudentResp> pageQurey(Pageable pageable);

  public StudentResp findById(Long id);

  public void deleteById(Long id);

  public void updateProfile(StudentProfileUpdateDTO studentUpdateDTO);

  public void add(StudentAddDTO studentAddDTO);

  public void batchAdd(List<StudentAddDTO> students);

  void updateStudent(StudentUpdateDTO studentUpdateDTO);

}
