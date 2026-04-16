package org.ga2e.project.module.Institute.repo;

import org.ga2e.project.module.Institute.entity.Institute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(value = "institute")
public interface InstituteRepo extends JpaRepository<Institute, Long> {

}
