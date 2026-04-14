package org.ga2e.project.common.constant;

public enum CourseType {
  MAJOR_COURSE("必修课"),
  ELECTIVE_COURSE("选修课");

  private final String description;

  CourseType(String description) {
    this.description = description;
  }

  public String getDescription() {
    return description;
  }

}
