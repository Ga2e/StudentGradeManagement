package org.ga2e.project.module.Professional.repo;

import org.ga2e.project.module.Professional.entity.Professional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(value = "Professional")
public interface ProfessionalRepo extends JpaRepository<Professional, Long> {

}
