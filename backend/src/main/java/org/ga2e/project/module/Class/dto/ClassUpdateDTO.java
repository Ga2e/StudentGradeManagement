package org.ga2e.project.module.Class.dto;

import java.util.HashSet;
import java.util.Set;

import org.ga2e.project.common.constant.ClassType;
import org.ga2e.project.module.Class.entity.ClassTeacher;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClassUpdateDTO {
  private Long id;
  private String name;
  private ClassType type;
  private Long professionalId;

  private Set<ClassTeacher> classTeachers = new HashSet<>();

  private Long year;

}
