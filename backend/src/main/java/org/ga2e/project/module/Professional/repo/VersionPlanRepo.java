package org.ga2e.project.module.Professional.repo;

import org.ga2e.project.module.Professional.entity.VersionPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VersionPlanRepo extends JpaRepository<VersionPlan, Long> {

  Optional<VersionPlan> findByVersionNumber(String versionNumber);
  List<VersionPlan> findByProfessionalId(Long professionalId);

}
