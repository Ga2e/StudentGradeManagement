package org.ga2e.project.module.Professional.resp;

import java.time.LocalDateTime;

import org.ga2e.project.module.Institute.resp.InstituteResp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfessionalResp {
  private Long id;

  private String name;

  private InstituteResp institute;

  private LocalDateTime createdAt;

  private LocalDateTime updatedAt = LocalDateTime.now();

}
