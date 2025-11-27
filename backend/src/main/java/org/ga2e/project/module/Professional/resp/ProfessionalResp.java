package org.ga2e.project.module.Professional.resp;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfessionalResp {
  private Long id;

  private String name;

  private Long instituteId;

  private LocalDateTime createdAt;

  private LocalDateTime updatedAt = LocalDateTime.now();

}
