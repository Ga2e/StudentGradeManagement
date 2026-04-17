package org.ga2e.project.common.constant;

public enum TeacherType {
  HEADER("班主任,导员"),
  ASSISTANT("助教"),
  LECTURER("主讲教师");

  private final String description;

  TeacherType(String description) {
    this.description = description;
  }

  public String getDescription() {
    return description;
  }

}
