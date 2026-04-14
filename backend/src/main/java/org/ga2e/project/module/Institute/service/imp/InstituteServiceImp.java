package org.ga2e.project.module.Institute.service.imp;

import java.time.LocalDateTime;
import java.util.List;

import org.ga2e.project.module.Institute.dto.InstituteAddDTO;
import org.ga2e.project.module.Institute.dto.InstituteUpdateDTO;
import org.ga2e.project.module.Institute.entity.Institute;
import org.ga2e.project.module.Institute.mapper.InstituteMapper;
import org.ga2e.project.module.Institute.repo.InstituteRepo;
import org.ga2e.project.module.Institute.resp.InstituteResp;
import org.ga2e.project.module.Institute.service.InstituteService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InstituteServiceImp implements InstituteService {

  private final InstituteRepo instituteRepo;
  private final InstituteMapper instituteMapper;

  @Override
  public List<InstituteResp> findAll() {
    List<Institute> all = instituteRepo.findAll();
    List<InstituteResp> entityToResp = instituteMapper.entitysToResps(all);
    return entityToResp;
  }

  @Override
  public Page<InstituteResp> pageQurey(Pageable pageable) {
    Page<Institute> iPage = instituteRepo.findAll(pageable);
    Page<InstituteResp> entityToResp = instituteMapper.entitysToResps(iPage);

    return entityToResp;

  }

  @Override
  public void deleteById(Long id) {
    instituteRepo.deleteById(id);
  }

  @Override
  public void update(InstituteUpdateDTO instituteUpdateDTO) {

    Institute entity = instituteMapper.UpdateToEntity(instituteUpdateDTO);
    instituteRepo.save(entity);

  }

  @Override
  public void add(InstituteAddDTO instituteAddDTO) {
    Institute addToEntity = instituteMapper.AddToEntity(instituteAddDTO);
    addToEntity.setCreatedAt(LocalDateTime.now());
    instituteRepo.save(addToEntity);
  }

  @Override
  public void batchAdd(List<InstituteAddDTO> institutes) {
    List<Institute> entitys = instituteMapper.listAddDTOToEntitys(institutes);
    entitys
        .stream()
        .forEach((institute) -> institute.setCreatedAt(LocalDateTime.now()));
    instituteRepo.saveAll(entitys);
  }

  @Override
  public InstituteResp findById(Long id) {
    Institute institute = instituteRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("user is not exist"));
    InstituteResp resp = instituteMapper.entityToResp(institute);
    return resp;

  }

}
