package org.ga2e.project.module.Professional.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

import org.ga2e.project.module.Course.entity.Course;

@Data
@Entity
@Table(name = "professional_course")
public class ProfessionalCourse {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @ManyToOne
  @JoinColumn(name = "professional_id")
  private Professional professional;

  @ManyToOne
  @JoinColumn(name = "course_id")
  private Course course;

  @Column(name = "semester")
  private Integer semester;

}
