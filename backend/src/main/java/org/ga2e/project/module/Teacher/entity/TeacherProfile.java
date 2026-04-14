package org.ga2e.project.module.Teacher.entity;

import java.time.LocalDate;

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
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "teacher_profile")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeacherProfile {

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

  @Column(length = 30)
  private String title; // 职称

  @Column(length = 30)
  private String degree; // 学历

  @Column(name = "office_room", length = 50)
  private String officeRoom;

  @Column(name = "hire_date")
  private LocalDate hireDate;

  @Column(length = 255)
  private String avatar;

  public enum Gender {
    男, 女, 其他
  }
}
