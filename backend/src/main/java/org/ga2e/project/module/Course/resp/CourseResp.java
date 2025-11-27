package org.ga2e.project.module.Course.resp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseResp {
  private Long id;

  private String code;

  private String name;

  private List<Long> teachers;

  private BigDecimal credits;

  private Integer hours;

  private LocalDateTime createdAt;

}
