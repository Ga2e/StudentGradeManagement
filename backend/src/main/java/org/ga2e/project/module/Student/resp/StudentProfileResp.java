package org.ga2e.project.module.Student.resp;

import java.time.LocalDate;
import java.time.Year;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentProfileResp {

  private Long userId;

  private String name;

  private String gender;

  private LocalDate birthday;

  private Year enrollmentYear;

  private Year expectedGraduation;

  private String avatar;

  private String idCard; // 加密存储（业务层处理）

}
