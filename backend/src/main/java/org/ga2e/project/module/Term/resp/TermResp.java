package org.ga2e.project.module.Term.resp;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 学期返回结构（和 TeacherResp 风格完全一致）
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TermResp {

  private Long id;

  /** 学期名称，如 "2024-2025 学年第一学期" */
  private String name;

  /** 开始日期 */
  private LocalDate startDate;

  /** 结束日期 */
  private LocalDate endDate;

  /** 创建时间 */
  private LocalDateTime createdAt;

  /** 更新时间 */
  private LocalDateTime updatedAt;
}
