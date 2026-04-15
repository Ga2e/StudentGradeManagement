package org.ga2e.project.common.constant;

public enum ClassType {
  ADMIN_CLSS("行政班"),
  TEACHER_CLASS("教学班");

  private final String description;

  ClassType(String description) {
    this.description = description;
  }

  public String getDescription() {
    return description;
  }

}
