package org.ga2e.project.module.Class.entity;

import org.ga2e.project.module.Class.pojo.ClassCourseId;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.Data;

// 行政班课程表
@Data
@Entity
@Table(name = "class_course")
public class ClassCourse {
  @EmbeddedId
  private ClassCourseId id;

  @ManyToOne
  @MapsId("classId")
  @JoinColumn(name = "class_id")
  private Class clazz;

  @ManyToOne
  @MapsId("courseId")
  @JoinColumn(name = "course_id")
  private org.ga2e.project.module.Course.entity.Course course;
}
