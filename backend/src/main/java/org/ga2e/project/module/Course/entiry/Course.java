package org.ga2e.project.module.Course.entiry;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.ga2e.project.module.User.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class Course {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false)
  private Long id;

  @Column(name = "code", nullable = false, length = 20, unique = true)
  private String code;

  @Column(name = "name", nullable = false, length = 100)
  private String name;

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(name = "course_open", joinColumns = { @JoinColumn(name = "course_id") }, inverseJoinColumns = {
      @JoinColumn(name = "user_id") })
  private List<User> teachers;

  @Column(name = "credits", nullable = false, precision = 3, scale = 1)
  private BigDecimal credits;

  @Column(name = "hours", nullable = false, columnDefinition = "tinyint unsigned default 0")
  private Integer hours;

  @Column(name = "created_at", nullable = false, updatable = false, insertable = false)
  private LocalDateTime createdAt;

  @PrePersist
  void onCreate() {
    this.setCreatedAt(LocalDateTime.now());
  }
}
