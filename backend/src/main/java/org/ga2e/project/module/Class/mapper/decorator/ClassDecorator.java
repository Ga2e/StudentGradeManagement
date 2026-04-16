package org.ga2e.project.module.Class.mapper.decorator;

import java.util.List;

import org.ga2e.project.module.Professional.entity.Professional;
import org.ga2e.project.module.Professional.repo.ProfessionalRepo;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class ClassDecorator {

  private final ProfessionalRepo professionalRepo;

  public Professional idToEntity(Long id) {
    return professionalRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("institute not existed"));
  }

}
