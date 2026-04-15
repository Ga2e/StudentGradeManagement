package org.ga2e.project.module.Professional.service.imp;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.ga2e.project.module.Course.entity.Course;
import org.ga2e.project.module.Course.repo.CourseRepo;
import org.ga2e.project.module.Professional.dto.GradePlanDTO;
import org.ga2e.project.module.Professional.dto.VersionPlanDTO;
import org.ga2e.project.module.Professional.entity.GradePlan;
import org.ga2e.project.module.Professional.entity.GradePlanCourse;
import org.ga2e.project.module.Professional.entity.Professional;
import org.ga2e.project.module.Professional.entity.VersionPlan;
import org.ga2e.project.module.Professional.entity.VersionPlanCourse;
import org.ga2e.project.module.Professional.repo.GradePlanCourseRepo;
import org.ga2e.project.module.Professional.repo.GradePlanRepo;
import org.ga2e.project.module.Professional.repo.ProfessionalRepo;
import org.ga2e.project.module.Professional.repo.VersionPlanCourseRepo;
import org.ga2e.project.module.Professional.repo.VersionPlanRepo;
import org.ga2e.project.module.Professional.resp.GradePlanResp;
import org.ga2e.project.module.Professional.resp.VersionPlanResp;
import org.ga2e.project.module.Professional.service.PlanService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PlanServiceImp implements PlanService {

  private final VersionPlanRepo versionPlanRepo;
  private final VersionPlanCourseRepo versionPlanCourseRepo;
  private final GradePlanRepo gradePlanRepo;
  private final GradePlanCourseRepo gradePlanCourseRepo;
  private final CourseRepo courseRepo;
  private final ProfessionalRepo professionalRepo;

  // 版本培养方案相关方法
  @Override
  @Transactional
  public VersionPlanResp addVersionPlan(VersionPlanDTO versionPlanDTO) {
    VersionPlan versionPlan = new VersionPlan();
    versionPlan.setVersionNumber(versionPlanDTO.getVersionNumber());
    versionPlan.setDescription(versionPlanDTO.getDescription());
    // 设置professional
    if (versionPlanDTO.getProfessionalId() != null) {
      Professional professional = professionalRepo.findById(versionPlanDTO.getProfessionalId()).orElseThrow();
      versionPlan.setProfessional(professional);
    }
    VersionPlan savedVersionPlan = versionPlanRepo.save(versionPlan);
    
    if (versionPlanDTO.getCourses() != null) {
      for (VersionPlanDTO.VersionPlanCourseDTO courseDTO : versionPlanDTO.getCourses()) {
        VersionPlanCourse versionPlanCourse = new VersionPlanCourse();
        versionPlanCourse.setVersionPlan(savedVersionPlan);
        Course course = courseRepo.findById(courseDTO.getCourseId()).orElseThrow();
        versionPlanCourse.setCourse(course);
        versionPlanCourse.setSemester(courseDTO.getSemester());
        versionPlanCourseRepo.save(versionPlanCourse);
      }
    }
    
    return convertToVersionPlanResp(savedVersionPlan);
  }

  @Override
  @Transactional
  public VersionPlanResp updateVersionPlan(VersionPlanDTO versionPlanDTO) {
    VersionPlan versionPlan = versionPlanRepo.findById(versionPlanDTO.getId()).orElseThrow();
    versionPlan.setVersionNumber(versionPlanDTO.getVersionNumber());
    versionPlan.setDescription(versionPlanDTO.getDescription());
    // 设置professional
    if (versionPlanDTO.getProfessionalId() != null) {
      Professional professional = professionalRepo.findById(versionPlanDTO.getProfessionalId()).orElseThrow();
      versionPlan.setProfessional(professional);
    }
    VersionPlan updatedVersionPlan = versionPlanRepo.save(versionPlan);
    
    // 删除旧的课程关联
    versionPlanCourseRepo.deleteByVersionPlanId(versionPlan.getId());
    
    // 添加新的课程关联
    if (versionPlanDTO.getCourses() != null) {
      for (VersionPlanDTO.VersionPlanCourseDTO courseDTO : versionPlanDTO.getCourses()) {
        VersionPlanCourse versionPlanCourse = new VersionPlanCourse();
        versionPlanCourse.setVersionPlan(updatedVersionPlan);
        Course course = courseRepo.findById(courseDTO.getCourseId()).orElseThrow();
        versionPlanCourse.setCourse(course);
        versionPlanCourse.setSemester(courseDTO.getSemester());
        versionPlanCourseRepo.save(versionPlanCourse);
      }
    }
    
    return convertToVersionPlanResp(updatedVersionPlan);
  }

  @Override
  @Transactional
  public void deleteVersionPlan(Long id) {
    versionPlanCourseRepo.deleteByVersionPlanId(id);
    versionPlanRepo.deleteById(id);
  }

  @Override
  public VersionPlanResp getVersionPlanById(Long id) {
    VersionPlan versionPlan = versionPlanRepo.findById(id).orElseThrow();
    return convertToVersionPlanResp(versionPlan);
  }

  @Override
  public List<VersionPlanResp> getAllVersionPlans() {
    List<VersionPlan> versionPlans = versionPlanRepo.findAll();
    return versionPlans.stream().map(this::convertToVersionPlanResp).collect(Collectors.toList());
  }

  @Override
  public List<VersionPlanResp> getVersionPlansByProfessionalId(Long professionalId) {
    List<VersionPlan> versionPlans = versionPlanRepo.findByProfessionalId(professionalId);
    return versionPlans.stream().map(this::convertToVersionPlanResp).collect(Collectors.toList());
  }

  // 年级培养方案相关方法
  @Override
  @Transactional
  public GradePlanResp addGradePlan(GradePlanDTO gradePlanDTO) {
    GradePlan gradePlan = new GradePlan();
    gradePlan.setGrade(gradePlanDTO.getGrade());
    gradePlan.setRevisionNotes(gradePlanDTO.getRevisionNotes());
    VersionPlan versionPlan = versionPlanRepo.findById(gradePlanDTO.getVersionPlanId()).orElseThrow();
    gradePlan.setVersionPlan(versionPlan);
    GradePlan savedGradePlan = gradePlanRepo.save(gradePlan);
    
    if (gradePlanDTO.getCourses() != null) {
      for (GradePlanDTO.GradePlanCourseDTO courseDTO : gradePlanDTO.getCourses()) {
        GradePlanCourse gradePlanCourse = new GradePlanCourse();
        gradePlanCourse.setGradePlan(savedGradePlan);
        Course course = courseRepo.findById(courseDTO.getCourseId()).orElseThrow();
        gradePlanCourse.setCourse(course);
        gradePlanCourse.setSemester(courseDTO.getSemester());
        gradePlanCourse.setIsRevised(courseDTO.getIsRevised());
        gradePlanCourse.setRevisionReason(courseDTO.getRevisionReason());
        gradePlanCourseRepo.save(gradePlanCourse);
      }
    }
    
    return convertToGradePlanResp(savedGradePlan);
  }

  @Override
  @Transactional
  public GradePlanResp updateGradePlan(GradePlanDTO gradePlanDTO) {
    GradePlan gradePlan = gradePlanRepo.findById(gradePlanDTO.getId()).orElseThrow();
    gradePlan.setGrade(gradePlanDTO.getGrade());
    gradePlan.setRevisionNotes(gradePlanDTO.getRevisionNotes());
    VersionPlan versionPlan = versionPlanRepo.findById(gradePlanDTO.getVersionPlanId()).orElseThrow();
    gradePlan.setVersionPlan(versionPlan);
    GradePlan updatedGradePlan = gradePlanRepo.save(gradePlan);
    
    // 删除旧的课程关联
    gradePlanCourseRepo.deleteByGradePlanId(gradePlan.getId());
    
    // 添加新的课程关联
    if (gradePlanDTO.getCourses() != null) {
      for (GradePlanDTO.GradePlanCourseDTO courseDTO : gradePlanDTO.getCourses()) {
        GradePlanCourse gradePlanCourse = new GradePlanCourse();
        gradePlanCourse.setGradePlan(updatedGradePlan);
        Course course = courseRepo.findById(courseDTO.getCourseId()).orElseThrow();
        gradePlanCourse.setCourse(course);
        gradePlanCourse.setSemester(courseDTO.getSemester());
        gradePlanCourse.setIsRevised(courseDTO.getIsRevised());
        gradePlanCourse.setRevisionReason(courseDTO.getRevisionReason());
        gradePlanCourseRepo.save(gradePlanCourse);
      }
    }
    
    return convertToGradePlanResp(updatedGradePlan);
  }

  @Override
  @Transactional
  public void deleteGradePlan(Long id) {
    gradePlanCourseRepo.deleteByGradePlanId(id);
    gradePlanRepo.deleteById(id);
  }

  @Override
  public GradePlanResp getGradePlanById(Long id) {
    GradePlan gradePlan = gradePlanRepo.findById(id).orElseThrow();
    return convertToGradePlanResp(gradePlan);
  }

  @Override
  public List<GradePlanResp> getAllGradePlans() {
    List<GradePlan> gradePlans = gradePlanRepo.findAll();
    return gradePlans.stream().map(this::convertToGradePlanResp).collect(Collectors.toList());
  }

  @Override
  public List<GradePlanResp> getGradePlansByVersionPlanId(Long versionPlanId) {
    List<GradePlan> gradePlans = gradePlanRepo.findByVersionPlanId(versionPlanId);
    return gradePlans.stream().map(this::convertToGradePlanResp).collect(Collectors.toList());
  }

  @Override
  public List<GradePlanResp> getGradePlansByProfessionalId(Long professionalId) {
    List<GradePlan> gradePlans = gradePlanRepo.findByVersionPlanProfessionalId(professionalId);
    return gradePlans.stream().map(this::convertToGradePlanResp).collect(Collectors.toList());
  }

  // 从版本培养方案复制生成年级培养方案
  @Override
  @Transactional
  public GradePlanResp copyFromVersionPlan(Long versionPlanId, String grade, String revisionNotes) {
    VersionPlan versionPlan = versionPlanRepo.findById(versionPlanId).orElseThrow();
    
    // 创建年级培养方案
    GradePlan gradePlan = new GradePlan();
    gradePlan.setGrade(grade);
    gradePlan.setRevisionNotes(revisionNotes);
    gradePlan.setVersionPlan(versionPlan);
    GradePlan savedGradePlan = gradePlanRepo.save(gradePlan);
    
    // 复制课程
    List<VersionPlanCourse> versionPlanCourses = versionPlanCourseRepo.findByVersionPlanId(versionPlanId);
    for (VersionPlanCourse versionPlanCourse : versionPlanCourses) {
      GradePlanCourse gradePlanCourse = new GradePlanCourse();
      gradePlanCourse.setGradePlan(savedGradePlan);
      gradePlanCourse.setCourse(versionPlanCourse.getCourse());
      gradePlanCourse.setSemester(versionPlanCourse.getSemester());
      gradePlanCourse.setIsRevised(false);
      gradePlanCourseRepo.save(gradePlanCourse);
    }
    
    return convertToGradePlanResp(savedGradePlan);
  }

  // 转换方法
  private VersionPlanResp convertToVersionPlanResp(VersionPlan versionPlan) {
    VersionPlanResp versionPlanResp = new VersionPlanResp();
    versionPlanResp.setId(versionPlan.getId());
    versionPlanResp.setVersionNumber(versionPlan.getVersionNumber());
    versionPlanResp.setDescription(versionPlan.getDescription());
    if (versionPlan.getProfessional() != null) {
      versionPlanResp.setProfessionalId(versionPlan.getProfessional().getId());
      versionPlanResp.setProfessionalName(versionPlan.getProfessional().getName());
    }
    versionPlanResp.setCreatedAt(versionPlan.getCreatedAt());
    versionPlanResp.setUpdatedAt(versionPlan.getUpdatedAt());
    
    List<VersionPlanCourse> versionPlanCourses = versionPlanCourseRepo.findByVersionPlanId(versionPlan.getId());
    List<VersionPlanResp.VersionPlanCourseResp> courseResps = versionPlanCourses.stream().map(course -> {
      VersionPlanResp.VersionPlanCourseResp courseResp = new VersionPlanResp.VersionPlanCourseResp();
      courseResp.setId(course.getId());
      courseResp.setCourseId(course.getCourse().getId());
      courseResp.setCourseName(course.getCourse().getName());
      courseResp.setCourseCode(course.getCourse().getCode());
      courseResp.setSemester(course.getSemester());
      return courseResp;
    }).collect(Collectors.toList());
    versionPlanResp.setCourses(courseResps);
    
    return versionPlanResp;
  }

  private GradePlanResp convertToGradePlanResp(GradePlan gradePlan) {
    GradePlanResp gradePlanResp = new GradePlanResp();
    gradePlanResp.setId(gradePlan.getId());
    gradePlanResp.setGrade(gradePlan.getGrade());
    gradePlanResp.setRevisionNotes(gradePlan.getRevisionNotes());
    if (gradePlan.getVersionPlan() != null) {
      gradePlanResp.setVersionPlanId(gradePlan.getVersionPlan().getId());
      gradePlanResp.setVersionPlanNumber(gradePlan.getVersionPlan().getVersionNumber());
      if (gradePlan.getVersionPlan().getProfessional() != null) {
        gradePlanResp.setProfessionalId(gradePlan.getVersionPlan().getProfessional().getId());
        gradePlanResp.setProfessionalName(gradePlan.getVersionPlan().getProfessional().getName());
      }
    }
    gradePlanResp.setCreatedAt(gradePlan.getCreatedAt());
    gradePlanResp.setUpdatedAt(gradePlan.getUpdatedAt());
    
    List<GradePlanCourse> gradePlanCourses = gradePlanCourseRepo.findByGradePlanId(gradePlan.getId());
    List<GradePlanResp.GradePlanCourseResp> courseResps = gradePlanCourses.stream().map(course -> {
      GradePlanResp.GradePlanCourseResp courseResp = new GradePlanResp.GradePlanCourseResp();
      courseResp.setId(course.getId());
      courseResp.setCourseId(course.getCourse().getId());
      courseResp.setCourseName(course.getCourse().getName());
      courseResp.setCourseCode(course.getCourse().getCode());
      courseResp.setSemester(course.getSemester());
      courseResp.setIsRevised(course.getIsRevised());
      courseResp.setRevisionReason(course.getRevisionReason());
      return courseResp;
    }).collect(Collectors.toList());
    gradePlanResp.setCourses(courseResps);
    
    return gradePlanResp;
  }

}
