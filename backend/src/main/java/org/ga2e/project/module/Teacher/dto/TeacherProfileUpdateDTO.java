package org.ga2e.project.module.Teacher.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TeacherProfileUpdateDTO {

  private Long userId;
  private String name;

  private String gender;
  private String avatar;
  private String title; // 职称
  private String degree; // 学历
  private String officeRoom;
  private LocalDate hireDate;

}
