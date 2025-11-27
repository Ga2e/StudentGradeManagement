package org.ga2e.project.module.Class.mapper.decorator;

import java.util.List;

import org.ga2e.project.module.Course.entiry.MajorCourse;
import org.ga2e.project.module.Course.repo.MajorCourseRepo;
import org.ga2e.project.module.Professional.entity.Professional;
import org.ga2e.project.module.Professional.repo.ProfessionalRepo;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class ClassDecorator {
  private final ProfessionalRepo professionalRepo;
  private final MajorCourseRepo majorCourseRepo;

  public MajorCourse idToEntity(Long id) {

    return majorCourseRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("MajorCourse not existed"));

  }

  public List<MajorCourse> classIdToEntity(Long classId) {
    return majorCourseRepo.findByClazzId(classId)
        .orElseThrow(() -> new RuntimeException("class not existed"));
  }

  public Professional professionalIdToEntity(Long professionalId) {
    log.error(professionalId.toString());
    return professionalRepo.findById(professionalId)
        .orElseThrow(() -> new RuntimeException("professional not existed"));
  }

}
