package org.ga2e.project.module.Professional.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "version_plan")
public class VersionPlan {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "version_number", nullable = false, unique = true)
  private String versionNumber; // 如：2019版、2023版

  @Column(name = "description")
  private String description; // 版本描述

  @ManyToOne
  @JoinColumn(name = "professional_id")
  private Professional professional; // 所属专业

  @OneToMany(mappedBy = "versionPlan")
  private List<VersionPlanCourse> courses; // 版本培养方案包含的课程

  @OneToMany(mappedBy = "versionPlan")
  private List<GradePlan> gradePlans; // 基于此版本的年级培养方案

  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt = LocalDateTime.now();

  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt = LocalDateTime.now();

  @PreUpdate
  public void preUpdate() {
    this.updatedAt = LocalDateTime.now();
  }

}
