package org.ga2e.project.module.ElectiveCourse.service.imp;

import java.util.List;
import java.util.stream.Collectors;

import org.ga2e.project.module.Course.service.CourseService;
import org.ga2e.project.module.ElectiveCourse.dto.ElectiveCourseAddDTO;
import org.ga2e.project.module.ElectiveCourse.entity.ElectiveCourse;
import org.ga2e.project.module.ElectiveCourse.mapper.ElectiveCourseMapper;
import org.ga2e.project.module.ElectiveCourse.repo.ElectiveCourseRepo;
import org.ga2e.project.module.ElectiveCourse.resp.ElectiveCourseResp;
import org.ga2e.project.module.Term.service.TermService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ElectiveCourseServiceImp implements org.ga2e.project.module.ElectiveCourse.service.ElectiveCourseService {

  @Autowired
  private ElectiveCourseRepo electiveCourseRepo;

  @Autowired
  private ElectiveCourseMapper electiveCourseMapper;

  @Autowired
  private CourseService courseService;

  @Autowired
  private TermService termService;

  @Override
  public void add(ElectiveCourseAddDTO electiveCourseAddDTO, Long userId) {
    // 检查是否已经选过该课程
    boolean exists = electiveCourseRepo.existsByUserIdAndCourseIdAndTermId(
        userId, electiveCourseAddDTO.getCourseId(), electiveCourseAddDTO.getTermId());
    if (exists) {
      throw new IllegalArgumentException("已经选过该课程");
    }

    ElectiveCourse electiveCourse = electiveCourseMapper.addDtoToEntity(electiveCourseAddDTO, userId);
    electiveCourseRepo.save(electiveCourse);
  }

  @Override
  public void delete(Long id, Long userId) {
    ElectiveCourse electiveCourse = electiveCourseRepo.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("选课记录不存在"));
    if (!electiveCourse.getUserId().equals(userId)) {
      throw new IllegalArgumentException("无权删除他人的选课记录");
    }
    electiveCourseRepo.delete(electiveCourse);
  }

  @Override
  public List<ElectiveCourseResp> findByUserId(Long userId) {
    List<ElectiveCourse> electiveCourses = electiveCourseRepo.findByUserId(userId);
    return electiveCourses.stream()
        .map(this::convertToResp)
        .collect(Collectors.toList());
  }

  @Override
  public List<ElectiveCourseResp> findByUserIdAndTermId(Long userId, Long termId) {
    List<ElectiveCourse> electiveCourses = electiveCourseRepo.findByUserIdAndTermId(userId, termId);
    return electiveCourses.stream()
        .map(this::convertToResp)
        .collect(Collectors.toList());
  }

  private ElectiveCourseResp convertToResp(ElectiveCourse electiveCourse) {
    ElectiveCourseResp resp = electiveCourseMapper.entityToResp(electiveCourse);
    resp.setCourse(courseService.findById(electiveCourse.getCourseId()));
    resp.setTerm(termService.getById(electiveCourse.getTermId()).getData());
    return resp;
  }

}
