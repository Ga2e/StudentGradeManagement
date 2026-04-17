package org.ga2e.project.module.Class.pojo;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable // 必须加这个注解
public class ClassTeacherId implements Serializable { // 必须实现 Serializable

  private Long courseId; // 课程ID
  private Long teacherId; // 教师ID

  // 必须提供无参构造函数（JPA 要求）
  public ClassTeacherId() {
  }

  // 推荐提供全参构造函数
  public ClassTeacherId(Long courseId, Long teacherId) {
    this.courseId = courseId;
    this.teacherId = teacherId;
  }

  // 必须重写 equals() 和 hashCode()（非常重要！）
  @Override
  public boolean equals(Object o) {
    if (this == o)
      return true;
    if (o == null || getClass() != o.getClass())
      return false;
    ClassTeacherId that = (ClassTeacherId) o;
    return Objects.equals(courseId, that.courseId) &&
        Objects.equals(teacherId, that.teacherId);
  }

  @Override
  public int hashCode() {
    return Objects.hash(courseId, teacherId);
  }

  // getters 和 setters（必须有）
  public Long getCourseId() {
    return courseId;
  }

  public void setCourseId(Long courseId) {
    this.courseId = courseId;
  }

  public Long getTeacherId() {
    return teacherId;
  }

  public void setTeacherId(Long teacherId) {
    this.teacherId = teacherId;
  }
}
