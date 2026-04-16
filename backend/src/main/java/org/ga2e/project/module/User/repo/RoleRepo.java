package org.ga2e.project.module.User.repo;

import org.ga2e.project.module.User.entity.Role;
import org.hibernate.boot.model.convert.spi.JpaAttributeConverterCreationContext;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepo extends JpaRepository<Role, Long> {

}
