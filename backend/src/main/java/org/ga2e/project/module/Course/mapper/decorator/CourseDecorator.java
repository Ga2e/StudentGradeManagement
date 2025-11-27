package org.ga2e.project.module.Course.mapper.decorator;

import java.util.List;

import org.ga2e.project.module.Class.repo.ClassRepo;
import org.ga2e.project.module.Course.entiry.Course;
import org.ga2e.project.module.Course.entiry.Term;
import org.ga2e.project.module.Course.repo.CourseRepo;
import org.ga2e.project.module.Course.repo.TermRepo;
import org.ga2e.project.module.User.entity.User;
import org.ga2e.project.module.User.repo.UserRepo;
import org.springframework.stereotype.Component;
import org.ga2e.project.module.Class.entity.Class;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CourseDecorator {
  private final UserRepo userRepo;
  private final CourseRepo courseRepo;
  private final ClassRepo classRepo;
  private final TermRepo termRepo;

  public User idToUser(Long id) {
    return userRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("student not exist"));
  }

  public Course idToCourse(Long id) {
    return courseRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("course not exist"));
  }

  public List<User> idsToUsers(List<Long> ids) {
    return userRepo.findAllById(ids);
  }

  public List<Long> teachersToIds(List<User> teachers) {

    return teachers.stream()
        .map(User::getId)
        .toList();
  }

  public Class idToClass(Long id) {
    return classRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("class not exist"));
  }

  public Term idToTerm(Long id) {
    return termRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("term not exist"));
  }

}
