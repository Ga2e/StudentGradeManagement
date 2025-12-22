package org.ga2e.project.module.Grade.service;

import java.util.List;

import org.ga2e.project.module.Grade.dto.GradeAddDTO;
import org.ga2e.project.module.Grade.dto.GradeUpdateDTO;
import org.ga2e.project.module.Grade.resp.GradeResp;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public interface GradeService {
  public List<GradeResp> findAll();

  Page<GradeResp> pageQurey(Pageable pageable);

  GradeResp findById(Long id);

  void deleteById(Long id);

  void update(GradeUpdateDTO gradeUpdateDto);

  void add(GradeAddDTO gradeAddDTO);

  void batchAdd(List<GradeAddDTO> classs);

  List<GradeResp> findMajorGradesByStudentId(Long id);

  List<GradeResp> findMajorGradesByClassId(Long id);

  List<GradeResp> findElectiveGradesByStudentId(Long id);

  List<GradeResp> findElectiveGradesByCourseId(Long id);

  List<GradeResp> findMeGrade();
}
