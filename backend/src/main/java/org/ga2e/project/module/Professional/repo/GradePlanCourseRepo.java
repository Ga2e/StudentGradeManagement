package org.ga2e.project.module.Professional.repo;

import org.ga2e.project.module.Professional.entity.GradePlanCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GradePlanCourseRepo extends JpaRepository<GradePlanCourse, Long> {

  List<GradePlanCourse> findByGradePlanId(Long gradePlanId);
  void deleteByGradePlanId(Long gradePlanId);

}
