package org.ga2e.project.module.Grade.mapper.decorator;

import org.ga2e.project.module.Course.entiry.Course;
import org.ga2e.project.module.Course.repo.CourseRepo;
import org.ga2e.project.module.User.entity.User;
import org.ga2e.project.module.User.repo.UserRepo;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class GradeDecorator {
  private final UserRepo userRepo;
  private final CourseRepo courseRepo;

  public User idToUserEntity(Long id) {
    return userRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("user not existed"));
  }

  public Course idToCourseEntity(Long id) {
    return courseRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("course not existed"));
  }

}
