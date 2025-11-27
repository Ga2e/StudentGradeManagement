package org.ga2e.project.module.Student.entity;

import java.time.LocalDate;
import java.time.Year;

import org.ga2e.project.module.User.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "student_profile")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentProfile {

  @Id
  @Column(name = "user_id")
  private Long userId;

  @OneToOne
  @MapsId
  @JoinColumn(name = "user_id")
  private User user;

  @Column(nullable = false, length = 50)
  private String name;

  @Enumerated(EnumType.STRING)
  @Column(columnDefinition = "enum('男','女','其他')")
  private Gender gender;

  private LocalDate birthday;

  @Column(name = "enrollment_year", nullable = false)
  private Year enrollmentYear;

  @Column(name = "expected_graduation")
  private Year expectedGraduation;

  @Column(length = 255)
  private String avatar;

  @Column(name = "id_card", length = 18)
  private String idCard; // 加密存储（业务层处理）

  // 枚举定义
  public enum Gender {
    男, 女, 其他
  }
}
