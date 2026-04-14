
package org.ga2e.project.module.Institute.mapper.decorator;

import org.ga2e.project.module.Professional.entity.Professional;
import org.ga2e.project.module.Professional.repo.ProfessionalRepo;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class InstituteDecorator {
  private final ProfessionalRepo professionalRepo;

  public Professional idToEntity(Long id) {
    return professionalRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("professional not existed"));
  }

}
