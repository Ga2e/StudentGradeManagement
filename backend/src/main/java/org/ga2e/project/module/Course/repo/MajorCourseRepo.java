package org.ga2e.project.module.Course.repo;

import java.util.List;
import java.util.Optional;

import org.ga2e.project.module.Course.entiry.MajorCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MajorCourseRepo extends JpaRepository<MajorCourse, Long> {
  MajorCourse findByCourseId(Long courseId);

  Optional<List<MajorCourse>> findByClazzId(Long clazzId);

}
