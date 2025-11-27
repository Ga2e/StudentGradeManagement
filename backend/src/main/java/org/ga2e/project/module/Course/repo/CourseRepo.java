package org.ga2e.project.module.Course.repo;

import org.ga2e.project.module.Course.entiry.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepo extends JpaRepository<Course, Long> {

}
