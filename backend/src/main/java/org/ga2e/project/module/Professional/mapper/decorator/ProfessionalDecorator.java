package org.ga2e.project.module.Professional.mapper.decorator;

import org.ga2e.project.module.Institute.entity.Institute;
import org.ga2e.project.module.Institute.repo.InstituteRepo;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class ProfessionalDecorator {
  private final InstituteRepo instituteRepo;

  public Institute idToEntity(Long id) {
    return instituteRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("institute not existed"));
  }

}
