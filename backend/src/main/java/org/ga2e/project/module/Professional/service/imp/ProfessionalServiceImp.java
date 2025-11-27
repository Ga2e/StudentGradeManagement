package org.ga2e.project.module.Professional.service.imp;

import java.time.LocalDateTime;
import java.util.List;

import org.ga2e.project.module.Professional.dto.ProfessionalAddDTO;
import org.ga2e.project.module.Professional.dto.ProfessionalUpdateDTO;
import org.ga2e.project.module.Professional.entity.Professional;
import org.ga2e.project.module.Professional.mapper.ProfessionalMapper;
import org.ga2e.project.module.Professional.repo.ProfessionalRepo;
import org.ga2e.project.module.Professional.resp.ProfessionalResp;
import org.ga2e.project.module.Professional.service.ProfessionalService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProfessionalServiceImp implements ProfessionalService {

  private final ProfessionalRepo professionalRepo;
  private final ProfessionalMapper professionalMapper;

  @Override
  public List<ProfessionalResp> findAll() {
    List<Professional> all = professionalRepo.findAll();
    List<ProfessionalResp> entitysToResps = professionalMapper.entitysToResps(all);
    return entitysToResps;
  }

  @Override
  public Page<ProfessionalResp> pageQurey(Pageable pageable) {
    Page<Professional> all = professionalRepo.findAll(pageable);
    Page<ProfessionalResp> entitysToResps = professionalMapper.entitysToResps(all);
    return entitysToResps;

  }

  @Override
  public void deleteById(Long id) {
    professionalRepo.deleteById(id);
  }

  @Override
  public void add(ProfessionalAddDTO professionalAddDTO) {
    Professional addToEntity = professionalMapper.AddToEntity(professionalAddDTO);
    addToEntity.setCreatedAt(LocalDateTime.now());
    professionalRepo.save(addToEntity);
  }

  @Override
  public void batchAdd(List<ProfessionalAddDTO> Professionals) {
    List<Professional> entitys = professionalMapper.listAddDTOToEntitys(Professionals);
    entitys.stream()
        .forEach(professional -> professional.setCreatedAt(LocalDateTime.now()));
    professionalRepo.saveAll(entitys);
  }

  @Override
  public ProfessionalResp findById(Long id) {
    Professional professional = professionalRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("user is not exist"));

    ProfessionalResp professionalResp = professionalMapper.entityToResp(professional);
    return professionalResp;

  }

  @Override
  public void update(ProfessionalUpdateDTO professionalUpdateDTO) {
    Professional entity = professionalMapper.UpdateToEntity(professionalUpdateDTO);
    professionalRepo.save(entity);

  }

}
