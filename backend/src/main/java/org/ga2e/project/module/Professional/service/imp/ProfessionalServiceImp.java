package org.ga2e.project.module.Professional.service.imp;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.ga2e.project.module.Course.entity.Course;
import org.ga2e.project.module.Course.repo.CourseRepo;
import org.ga2e.project.module.Professional.dto.ProfessionalAddDTO;
import org.ga2e.project.module.Professional.dto.ProfessionalPlanDTO;
import org.ga2e.project.module.Professional.dto.ProfessionalUpdateDTO;
import org.ga2e.project.module.Professional.entity.Professional;
import org.ga2e.project.module.Professional.entity.ProfessionalCourse;
import org.ga2e.project.module.Professional.mapper.ProfessionalMapper;
import org.ga2e.project.module.Professional.repo.ProfessionalCourseRepo;
import org.ga2e.project.module.Professional.repo.ProfessionalRepo;
import org.ga2e.project.module.Professional.resp.ProfessionalPlanResp;
import org.ga2e.project.module.Professional.resp.ProfessionalResp;
import org.ga2e.project.module.Professional.service.ProfessionalService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProfessionalServiceImp implements ProfessionalService {

  private final ProfessionalRepo professionalRepo;
  private final ProfessionalMapper professionalMapper;
  private final ProfessionalCourseRepo professionalCourseRepo;
  private final CourseRepo courseRepo;

  @Override
  public List<ProfessionalResp> findAll() {
    List<Professional> all = professionalRepo.findAll();
    List<ProfessionalResp> entitysToResps = professionalMapper.entitysToResps(all);
    return entitysToResps;
  }

  @Override
  public Page<ProfessionalResp> pageQurey(Pageable pageable) {
    Page<Professional> all = professionalRepo.findAll(pageable);
    Page<ProfessionalResp> entitysToResps = professionalMapper.entitysToResps(all);
    return entitysToResps;

  }

  @Override
  public void deleteById(Long id) {
    professionalRepo.deleteById(id);
  }

  @Override
  public void add(ProfessionalAddDTO professionalAddDTO) {
    Professional addToEntity = professionalMapper.AddToEntity(professionalAddDTO);
    addToEntity.setCreatedAt(LocalDateTime.now());
    professionalRepo.save(addToEntity);
  }

  @Override
  public void batchAdd(List<ProfessionalAddDTO> Professionals) {
    List<Professional> entitys = professionalMapper.listAddDTOToEntitys(Professionals);
    entitys.stream()
        .forEach(professional -> professional.setCreatedAt(LocalDateTime.now()));
    professionalRepo.saveAll(entitys);
  }

  @Override
  public ProfessionalResp findById(Long id) {
    Professional professional = professionalRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("user is not exist"));

    ProfessionalResp professionalResp = professionalMapper.entityToResp(professional);
    return professionalResp;

  }

  @Override
  public void update(ProfessionalUpdateDTO professionalUpdateDTO) {
    Professional entity = professionalMapper.UpdateToEntity(professionalUpdateDTO);
    professionalRepo.save(entity);

  }

  @Override
  public void addPlan(ProfessionalPlanDTO professionalPlanDTO) {
    // 先删除该专业、版本和年级的所有培养方案
    professionalCourseRepo.deleteByProfessionalIdAndVersionAndGrade(
        professionalPlanDTO.getProfessionalId(), 
        professionalPlanDTO.getVersion(), 
        professionalPlanDTO.getGrade()
    );
    
    // 添加新的培养方案
    Professional professional = professionalRepo.findById(professionalPlanDTO.getProfessionalId())
        .orElseThrow(() -> new RuntimeException("专业不存在"));
    
    List<Long> courseIds = professionalPlanDTO.getCourseIds();
    List<Integer> semesters = professionalPlanDTO.getSemesters();
    String version = professionalPlanDTO.getVersion();
    String grade = professionalPlanDTO.getGrade();
    
    for (int i = 0; i < courseIds.size(); i++) {
      Long courseId = courseIds.get(i);
      Integer semester = semesters != null && semesters.size() > i ? semesters.get(i) : 1;
      
      Course course = courseRepo.findById(courseId)
          .orElseThrow(() -> new RuntimeException("课程不存在"));
      
      ProfessionalCourse professionalCourse = new ProfessionalCourse();
      professionalCourse.setProfessional(professional);
      professionalCourse.setCourse(course);
      professionalCourse.setSemester(semester);
      professionalCourse.setVersion(version);
      professionalCourse.setGrade(grade);
      
      professionalCourseRepo.save(professionalCourse);
    }
  }

  @Override
  public ProfessionalPlanResp getPlanByProfessionalId(Long professionalId) {
    Professional professional = professionalRepo.findById(professionalId)
        .orElseThrow(() -> new RuntimeException("专业不存在"));
    
    List<ProfessionalCourse> professionalCourses = professionalCourseRepo.findByProfessionalId(professionalId);
    
    ProfessionalPlanResp planResp = new ProfessionalPlanResp();
    planResp.setId(professionalId);
    planResp.setProfessionalName(professional.getName());
    
    // 取第一个课程的版本和年级（假设同一专业的所有课程版本和年级相同）
    if (!professionalCourses.isEmpty()) {
      planResp.setVersion(professionalCourses.get(0).getVersion());
      planResp.setGrade(professionalCourses.get(0).getGrade());
    }
    
    List<ProfessionalPlanResp.CourseInfo> courseInfos = professionalCourses.stream()
        .map(pc -> {
          ProfessionalPlanResp.CourseInfo courseInfo = new ProfessionalPlanResp.CourseInfo();
          courseInfo.setId(pc.getCourse().getId());
          courseInfo.setName(pc.getCourse().getName());
          courseInfo.setCode(pc.getCourse().getCode());
          courseInfo.setSemester(pc.getSemester());
          return courseInfo;
        })
        .collect(Collectors.toList());
    
    planResp.setCourses(courseInfos);
    return planResp;
  }

  @Override
  public List<ProfessionalPlanResp> getAllPlans() {
    List<Professional> professionals = professionalRepo.findAll();
    
    return professionals.stream()
        .flatMap(professional -> {
          // 获取该专业的所有版本和年级组合
          List<Object[]> versionGradeCombinations = professionalCourseRepo.findDistinctVersionAndGradeByProfessionalId(professional.getId());
          
          return versionGradeCombinations.stream()
              .map(combination -> {
                String version = (String) combination[0];
                String grade = (String) combination[1];
                
                ProfessionalPlanResp planResp = new ProfessionalPlanResp();
                planResp.setId(professional.getId());
                planResp.setProfessionalName(professional.getName());
                planResp.setVersion(version);
                planResp.setGrade(grade);
                
                List<ProfessionalCourse> professionalCourses = professionalCourseRepo.findByProfessionalIdAndVersionAndGrade(
                    professional.getId(), version, grade
                );
                
                List<ProfessionalPlanResp.CourseInfo> courseInfos = professionalCourses.stream()
                    .map(pc -> {
                      ProfessionalPlanResp.CourseInfo courseInfo = new ProfessionalPlanResp.CourseInfo();
                      courseInfo.setId(pc.getCourse().getId());
                      courseInfo.setName(pc.getCourse().getName());
                      courseInfo.setCode(pc.getCourse().getCode());
                      courseInfo.setSemester(pc.getSemester());
                      return courseInfo;
                    })
                    .collect(Collectors.toList());
                
                planResp.setCourses(courseInfos);
                return planResp;
              });
        })
        .filter(plan -> plan.getCourses() != null && !plan.getCourses().isEmpty())
        .collect(Collectors.toList());
  }

  @Override
  public void deletePlan(Long professionalId) {
    professionalCourseRepo.deleteByProfessionalId(professionalId);
  }

  @Override
  public void deletePlanByVersionAndGrade(Long professionalId, String version, String grade) {
    professionalCourseRepo.deleteByProfessionalIdAndVersionAndGrade(professionalId, version, grade);
  }

}
