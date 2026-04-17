package org.ga2e.project.module.Class.repo;

import org.ga2e.project.module.Class.entity.ClassCourse;
import org.ga2e.project.module.Class.entity.ClassTeacher;
import org.ga2e.project.module.Class.pojo.ClassTeacherId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassTeacherRepo extends JpaRepository<ClassTeacher, ClassTeacherId> {

}
