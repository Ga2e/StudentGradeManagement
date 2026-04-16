package org.ga2e.project.module.Course.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.ga2e.project.common.constant.CourseType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Transient;
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

  @Transient
  @Enumerated(EnumType.STRING)
  private CourseType type;
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
