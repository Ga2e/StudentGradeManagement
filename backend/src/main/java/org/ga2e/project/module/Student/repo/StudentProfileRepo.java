package org.ga2e.project.module.Student.repo;

import org.ga2e.project.module.Student.entity.StudentProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentProfileRepo extends JpaRepository<StudentProfile, Long> {

}
