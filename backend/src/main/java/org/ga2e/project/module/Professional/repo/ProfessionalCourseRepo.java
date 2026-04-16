package org.ga2e.project.module.Professional.repo;

import org.ga2e.project.module.Professional.entity.ProfessionalCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfessionalCourseRepo extends JpaRepository<ProfessionalCourse, Long> {
  List<ProfessionalCourse> findByProfessionalId(Long professionalId);
  void deleteByProfessionalId(Long professionalId);
}
