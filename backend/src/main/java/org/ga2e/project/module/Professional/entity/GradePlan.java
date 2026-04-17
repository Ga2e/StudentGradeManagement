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
@Table(name = "grade_plan")
public class GradePlan {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "grade", nullable = false)
  private String grade; // 如：2024级

  @Column(name = "revision_notes")
  private String revisionNotes; // 年级特有的微调或修订说明

  @ManyToOne
  @JoinColumn(name = "version_plan_id")
  private VersionPlan versionPlan; // 基于的版本培养方案

  @OneToMany(mappedBy = "gradePlan")
  private List<GradePlanCourse> courses; // 年级培养方案包含的课程

  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt = LocalDateTime.now();

  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt = LocalDateTime.now();

  @PreUpdate
  public void preUpdate() {
    this.updatedAt = LocalDateTime.now();
  }

}
