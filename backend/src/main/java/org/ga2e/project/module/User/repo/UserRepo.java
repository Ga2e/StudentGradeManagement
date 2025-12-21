package org.ga2e.project.module.User.repo;

import java.util.List;
import java.util.Optional;

import org.ga2e.project.module.User.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository(value = "user")
public interface UserRepo extends JpaRepository<User, Long> {

  public Optional<User> findByEmail(String email);

  public Optional<User> findByIdAndRoleId(Long id, Long roleId);

  public Optional<User> findByPhone(String phone);

  public Optional<User> findByCode(String code);

  public void deleteByIdAndRoleId(Long id, Long roleId);

  public List<User> findByRoleId(Long roleId);

  public Page<User> findByRoleId(Pageable pageable, Long roleId);

}
