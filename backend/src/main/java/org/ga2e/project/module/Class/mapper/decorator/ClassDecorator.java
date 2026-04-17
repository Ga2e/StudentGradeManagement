package org.ga2e.project.module.Class.mapper.decorator;

import org.ga2e.project.module.Professional.entity.GradePlan;
import org.ga2e.project.module.Professional.repo.GradePlanRepo;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class ClassDecorator {

  private final GradePlanRepo gradePlanRepo;

  public GradePlan idToEntity(Long id) {
    return gradePlanRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("grade plan not existed"));
  }

}
