package org.ga2e.project.module.Professional.entity;

import java.time.LocalDateTime;
import java.util.List;

import org.ga2e.project.module.Class.entity.Class;
import org.ga2e.project.module.Institute.entity.Institute;
import org.ga2e.project.module.Professional.entity.Professional;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "Professional")
public class Professional {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "name", nullable = false)
  private String name;

  @OneToMany(mappedBy = "professional", fetch = FetchType.LAZY)
  private List<Class> classes;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "institute_id")
  private Institute institute;

  @Column(name = "created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt = LocalDateTime.now();

  @PreUpdate
  public void preUpdate() {
    this.updatedAt = LocalDateTime.now();
  }

}
