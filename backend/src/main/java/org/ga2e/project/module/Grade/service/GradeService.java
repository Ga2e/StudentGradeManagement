package org.ga2e.project.module.Grade.service;

import java.util.List;

import org.ga2e.project.module.Grade.dto.GradeAddDTO;
import org.ga2e.project.module.Grade.dto.GradeUpdateDto;
import org.ga2e.project.module.Grade.resp.GradeResp;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

@Service
public interface GradeService {
  public List<GradeResp> findAll();

  public Page<GradeResp> pageQurey(Pageable pageable);

  public GradeResp findById(Long id);

  public void deleteById(Long id);

  public void update(GradeUpdateDto gradeUpdateDto);

  public void add(GradeAddDTO gradeAddDTO);

  public void batchAdd(List<GradeAddDTO> classs);

}
