package org.ga2e.project.module.Student.dto;

import java.time.LocalDate;
import java.time.Year;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentProfileAddDTO {
  private String name;

  private String gender;
  private String avatar;

  private LocalDate birthday;

  private Year enrollmentYear;

  private Year expectedGraduation;

  private String idCard; // 加密存储（业务层处理）

}
