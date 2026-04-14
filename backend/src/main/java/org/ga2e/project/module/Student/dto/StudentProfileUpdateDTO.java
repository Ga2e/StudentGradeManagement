package org.ga2e.project.module.Student.dto;

import java.time.LocalDate;
import java.time.Year;

import org.ga2e.project.module.Student.entity.StudentProfile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentProfileUpdateDTO {
  private Long userId;
  private String name;

  private String gender;

  private LocalDate birthday;

  private Year enrollmentYear;

  private Year expectedGraduation;
  private String avatar;

  private String idCard;

}
