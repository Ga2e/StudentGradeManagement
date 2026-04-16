package org.ga2e.project.module.Class.repo;

import org.ga2e.project.module.Class.entity.Class;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(value = "class")
public interface ClassRepo extends JpaRepository<Class, Long> {

}
