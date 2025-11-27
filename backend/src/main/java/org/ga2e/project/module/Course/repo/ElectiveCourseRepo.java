package org.ga2e.project.module.Course.repo;

import java.util.List;

import org.ga2e.project.module.Course.entiry.ElectiveCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ElectiveCourseRepo extends JpaRepository<ElectiveCourse, Long> {
  public List<ElectiveCourse> findByUserId(Long userId);

  public List<ElectiveCourse> findByCourseId(Long CourseId);

}
