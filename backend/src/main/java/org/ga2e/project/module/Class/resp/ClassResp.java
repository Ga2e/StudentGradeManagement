package org.ga2e.project.module.Class.resp;

import java.time.LocalDateTime;
import java.util.List;

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

  private Long professionalId;

  private List<Long> courseIds;

  private LocalDateTime createdAt = LocalDateTime.now();

  private LocalDateTime updatedAt = LocalDateTime.now();

}
