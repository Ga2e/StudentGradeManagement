package org.ga2e.project.module.Class.resp;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import org.ga2e.project.common.constant.ClassType;
import org.ga2e.project.module.Class.entity.ClassTeacher;
import org.ga2e.project.module.Professional.resp.ProfessionalResp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClassResp {
  private Long id;

  private String name;

  private Long year;

  private ProfessionalResp professional;

  private List<Long> courseIds;

  private LocalDateTime createdAt = LocalDateTime.now();

  private LocalDateTime updatedAt = LocalDateTime.now();

  private ClassType type;

  private Set<ClassTeacher> classTeachers;

}
