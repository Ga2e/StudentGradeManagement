package org.ga2e.project.module.Grade.repo;

import java.util.List;

import org.ga2e.project.module.Grade.entity.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GradeRepo extends JpaRepository<Grade, Long> {
  public List<Grade> findByStudentIdAndCourseIdIn(Long studentId, List<Long> courseIds);

  public List<Grade> findByCourseId(Long courseId);

  public List<Grade> findByStudentId(Long studentId);
}
