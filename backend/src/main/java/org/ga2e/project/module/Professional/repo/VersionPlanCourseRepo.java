package org.ga2e.project.module.Professional.repo;

import org.ga2e.project.module.Professional.entity.VersionPlanCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VersionPlanCourseRepo extends JpaRepository<VersionPlanCourse, Long> {

  List<VersionPlanCourse> findByVersionPlanId(Long versionPlanId);
  void deleteByVersionPlanId(Long versionPlanId);

}
