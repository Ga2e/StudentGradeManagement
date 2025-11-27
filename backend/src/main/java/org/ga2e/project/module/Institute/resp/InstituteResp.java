
package org.ga2e.project.module.Institute.resp;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InstituteResp {
  private Long id;

  private String name;

  private LocalDateTime createdAt;

  private LocalDateTime updatedAt;

}
