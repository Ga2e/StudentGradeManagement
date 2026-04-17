package org.ga2e.project.module.Professional.repo;

import org.ga2e.project.module.Professional.entity.GradePlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GradePlanRepo extends JpaRepository<GradePlan, Long> {

  Optional<GradePlan> findByGrade(String grade);
  List<GradePlan> findByVersionPlanId(Long versionPlanId);
  List<GradePlan> findByVersionPlanProfessionalId(Long professionalId);

}
