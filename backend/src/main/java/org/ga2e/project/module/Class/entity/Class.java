package org.ga2e.project.module.Class.entity;

import java.time.LocalDateTime;
import java.util.List;
import org.ga2e.project.module.Course.entiry.MajorCourse;
import org.ga2e.project.module.Professional.entity.Professional;
import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "class")
public class Class {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "name", nullable = false)
  private String name;

  @Column(name = "year", nullable = false)
  private Long year;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "professional_id")
  private Professional professional;

  @OneToMany(fetch = FetchType.LAZY)
  @JoinColumn(name = "class_id")
  private List<MajorCourse> courses;

  @CreationTimestamp
  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt = LocalDateTime.now();

  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt = LocalDateTime.now();

  @PreUpdate
  private void preUpdate() {
    this.updatedAt = LocalDateTime.now();
  }
}
