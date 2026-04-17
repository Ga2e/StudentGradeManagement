package org.ga2e.project.module.Class.repo;

import org.ga2e.project.module.Class.entity.ClassCourse;
import org.ga2e.project.module.Class.pojo.ClassCourseId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository()
public interface ClassCourseRepo extends JpaRepository<ClassCourse, ClassCourseId> {
  List<ClassCourse> findById_ClassId(Long classId);
}
