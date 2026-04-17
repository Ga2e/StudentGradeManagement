package org.ga2e.project.module.Class.pojo;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode
@Embeddable
public class ClassCourseId implements Serializable {

  private Long classId;
  private Long courseId;
  private String name;

}
