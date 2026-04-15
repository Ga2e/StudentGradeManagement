package org.ga2e.project.module.ElectiveCourse.repo;

import java.util.List;

import org.ga2e.project.module.ElectiveCourse.entity.ElectiveCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ElectiveCourseRepo extends JpaRepository<ElectiveCourse, Long> {
  List<ElectiveCourse> findByUserId(Long userId);
  List<ElectiveCourse> findByUserIdAndTermId(Long userId, Long termId);
  boolean existsByUserIdAndCourseIdAndTermId(Long userId, Long courseId, Long termId);

}
