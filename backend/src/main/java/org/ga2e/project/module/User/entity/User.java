package org.ga2e.project.module.User.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.ga2e.project.module.Student.entity.StudentProfile;
import org.ga2e.project.module.Teacher.entity.TeacherProfile;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user", indexes = {
    @Index(name = "idx_code", columnList = "code"),
    @Index(name = "idx_email", columnList = "email"),
    @Index(name = "idx_phone", columnList = "phone")
})
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User implements UserDetails {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "code", nullable = false, length = 20, unique = true)
  private String code;

  @Column(name = "email", nullable = false, unique = true, length = 255)
  private String email;

  @Column(name = "phone", length = 20)
  private String phone;

  @Column(name = "password", nullable = false, length = 255)
  private String password;

  @ManyToOne
  @JoinColumn(name = "role_id")
  private Role role;

  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt;

  @OneToOne(mappedBy = "user")
  private StudentProfile studentProfile;

  @OneToOne(mappedBy = "user")
  private TeacherProfile teacherProfile;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    List<GrantedAuthority> grants = new ArrayList<>();
    grants.add(new SimpleGrantedAuthority("ROLE_" + role.getName()));

    List<Permission> permissions = role.getPermissions();
    for (Permission permission : permissions) {
      grants.add(new SimpleGrantedAuthority(permission.getName()));
    }
    return grants;
  }

  @Override
  public String getUsername() {
    return getCode();
  }

}
