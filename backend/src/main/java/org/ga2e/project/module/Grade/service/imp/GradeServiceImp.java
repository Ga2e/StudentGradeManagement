package org.ga2e.project.module.Grade.service.imp;

import java.time.LocalDateTime;
import java.util.List;

import org.ga2e.project.module.Class.entity.Class;
import org.ga2e.project.module.Class.repo.ClassRepo;
import org.ga2e.project.module.Course.entiry.MajorCourse;
import org.ga2e.project.module.Course.repo.ElectiveCourseRepo;
import org.ga2e.project.module.Grade.dto.GradeAddDTO;
import org.ga2e.project.module.Grade.dto.GradeUpdateDTO;
import org.ga2e.project.module.Grade.entity.Grade;
import org.ga2e.project.module.Grade.mapper.GradeMapper;
import org.ga2e.project.module.Grade.repo.GradeRepo;
import org.ga2e.project.module.Grade.resp.GradeResp;
import org.ga2e.project.module.Grade.service.GradeService;
import org.ga2e.project.module.User.entity.User;
import org.ga2e.project.module.User.repo.UserRepo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GradeServiceImp implements GradeService {

  private final GradeRepo gradeRepo;
  private final GradeMapper gradeMapper;
  private final ClassRepo classRepo;
  private final UserRepo userRepo;
  private final ElectiveCourseRepo electiveCourseRepo;

  @Override
  public List<GradeResp> findAll() {
    List<Grade> all = gradeRepo.findAll();
    List<GradeResp> entityToResp = gradeMapper.entitysToResps(all);
    return entityToResp;
  }

  @Override
  public Page<GradeResp> pageQurey(Pageable pageable) {
    Page<Grade> iPage = gradeRepo.findAll(pageable);
    Page<GradeResp> entityToResp = gradeMapper.entitysToResps(iPage);

    return entityToResp;

  }

  @Override
  public void deleteById(Long id) {
    gradeRepo.deleteById(id);
  }

  @Override
  public void update(GradeUpdateDTO gradeUpdateDTO) {

    Grade entity = gradeMapper.UpdateToEntity(gradeUpdateDTO);
    gradeRepo.save(entity);

  }

  @Override
  public void add(GradeAddDTO gradeAddDTO) {
    Grade addToEntity = gradeMapper.AddToEntity(gradeAddDTO);
    addToEntity.setCreatedAt(LocalDateTime.now());
    gradeRepo.save(addToEntity);
  }

  @Override
  public void batchAdd(List<GradeAddDTO> grades) {
    List<Grade> entitys = gradeMapper.listAddDTOToEntitys(grades);
    entitys
        .stream()
        .forEach((grade) -> grade.setCreatedAt(LocalDateTime.now()));
    gradeRepo.saveAll(entitys);
  }

  @Override
  public GradeResp findById(Long id) {
    Grade grade = gradeRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("user is not exist"));
    GradeResp resp = gradeMapper.entityToResp(grade);
    return resp;

  }

  @Override
  public List<GradeResp> findMajorGradesByStudentId(Long id) {

    User student = userRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("user not exist"));
    return this.findMajorGradesByClassId(student.getId());
  }

  @Override
  public List<GradeResp> findMajorGradesByClassId(Long id) {
    Class clazz = classRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("class not exist"));

    List<Long> courses = clazz.getCourses().stream()
        .map(MajorCourse::getId)
        .toList();

    List<Grade> grades = gradeRepo.findByStudentIdAndCourseIdIn(id, courses);
    return gradeMapper.entitysToResps(grades);

  }

  @Override
  public List<GradeResp> findElectiveGradesByStudentId(Long id) {
    userRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("user not exist"));

    List<Grade> grades = gradeRepo.findByStudentId(id);
    return gradeMapper.entitysToResps(grades);

  }

  @Override
  public List<GradeResp> findElectiveGradesByCourseId(Long id) {
    electiveCourseRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("elective course not exist"));

    List<Grade> grades = gradeRepo.findByCourseId(id);
    return gradeMapper.entitysToResps(grades);

  }

}
