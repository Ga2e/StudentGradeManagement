package org.ga2e.project.module.Professional.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

import org.ga2e.project.module.Course.entity.Course;

@Data
@Entity
@Table(name = "grade_plan_course")
public class GradePlanCourse {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @ManyToOne
  @JoinColumn(name = "grade_plan_id")
  private GradePlan gradePlan; // 所属年级培养方案

  @ManyToOne
  @JoinColumn(name = "course_id")
  private Course course; // 课程

  @Column(name = "semester")
  private Integer semester; // 学期

  @Column(name = "is_revised")
  private Boolean isRevised = false; // 是否为修订课程

  @Column(name = "revision_reason")
  private String revisionReason; // 修订原因

}
