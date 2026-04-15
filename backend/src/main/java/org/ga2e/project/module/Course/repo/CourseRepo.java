package org.ga2e.project.module.Course.repo;

import java.util.List;

import org.ga2e.project.module.Course.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.ga2e.project.common.constant.CourseType;

@Repository
public interface CourseRepo extends JpaRepository<Course, Long> {

}
