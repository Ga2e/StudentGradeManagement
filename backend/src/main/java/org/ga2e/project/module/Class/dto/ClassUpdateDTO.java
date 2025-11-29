package org.ga2e.project.module.Class.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClassUpdateDTO {
  private Long id;
  private String name;

  private Long year;

  private Long professionalId;

}
