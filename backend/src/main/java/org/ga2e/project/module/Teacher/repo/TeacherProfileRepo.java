package org.ga2e.project.module.Teacher.repo;

import org.ga2e.project.module.Teacher.entity.TeacherProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherProfileRepo extends JpaRepository<TeacherProfile, Long> {

}
