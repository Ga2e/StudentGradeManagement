package org.ga2e.project.module.User.repo;

import org.ga2e.project.module.User.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(value = "user")
public interface UserRepo extends JpaRepository<User, Long> {

  public User findByEmail(String email);

  public User findByPhone(String phone);

  public User findByCode(String Code);

}
