package org.ga2e.project.module.Professional.service;

import java.util.List;

import org.ga2e.project.module.Professional.dto.ProfessionalAddDTO;
import org.ga2e.project.module.Professional.dto.ProfessionalUpdateDTO;
import org.ga2e.project.module.Professional.resp.ProfessionalResp;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface ProfessionalService {

  public List<ProfessionalResp> findAll();

  public Page<ProfessionalResp> pageQurey(Pageable pageable);

  public ProfessionalResp findById(Long id);

  public void deleteById(Long id);

  public void update(ProfessionalUpdateDTO professionalUpdateDTO);

  public void add(ProfessionalAddDTO professionalAddDTO);

  public void batchAdd(List<ProfessionalAddDTO> professionals);

}
