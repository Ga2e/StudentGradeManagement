package org.ga2e.project.module.Class.entity;

import org.ga2e.project.common.constant.ClassType;
import org.ga2e.project.module.Class.pojo.ClassTeacherId;
import org.ga2e.project.module.Course.entity.Course;
import org.ga2e.project.module.User.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;

// 开设课程
@Entity
@Table(name = "class_teacher")
public class ClassTeacher {

  @EmbeddedId
  private ClassTeacherId id; // 复合主键类

  @ManyToOne
  @MapsId("courseId")
  @JoinColumn(name = "course_id")
  private Course course;

  // 课程名称
  private String name;
  @ManyToOne
  @MapsId("teacherId")
  @JoinColumn(name = "teacher_id")
  private User teacher;

  @Enumerated(value = EnumType.STRING)
  @Column(name = "type", nullable = false, length = 20)
  private ClassType type;

  private String semester; // 2025-2026-1
  private Integer teachingHours;

}
