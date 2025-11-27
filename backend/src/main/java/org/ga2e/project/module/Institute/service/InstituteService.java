package org.ga2e.project.module.Institute.service;

import java.util.List;

import org.ga2e.project.module.Institute.dto.InstituteAddDTO;
import org.ga2e.project.module.Institute.dto.InstituteUpdateDTO;
import org.ga2e.project.module.Institute.resp.InstituteResp;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface InstituteService {

  public List<InstituteResp> findAll();

  public Page<InstituteResp> pageQurey(Pageable pageable);

  public InstituteResp findById(Long id);

  public void deleteById(Long id);

  public void update(InstituteUpdateDTO instituteUpdateDTO);

  public void add(InstituteAddDTO instituteAddDTO);

  public void batchAdd(List<InstituteAddDTO> institutes);

}
