package org.ga2e.project.module.Class.service.imp;

import java.time.LocalDateTime;
import java.util.List;

import org.ga2e.project.module.Class.dto.AddCoursesDTO;
import org.ga2e.project.module.Class.dto.ClassAddDTO;
import org.ga2e.project.module.Class.dto.ClassUpdateDTO;
import org.ga2e.project.module.Class.entity.Class;
import org.ga2e.project.module.Class.mapper.ClassMapper;
import org.ga2e.project.module.Class.repo.ClassRepo;
import org.ga2e.project.module.Class.resp.ClassResp;
import org.ga2e.project.module.Class.service.ClassService;
import org.ga2e.project.module.Course.dto.BindDTO;
import org.ga2e.project.module.Course.service.CourseService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ClassServiceImp implements ClassService {

  private final ClassRepo classRepo;
  private final ClassMapper classMapper;
  private final CourseService courseService;

  @Override
  public List<ClassResp> findAll() {

    List<Class> all = classRepo.findAll();
    List<ClassResp> entitysToResps = classMapper.entitysToResps(all);
    return entitysToResps;
  }

  @Override
  public Page<ClassResp> pageQurey(Pageable pageable) {
    Page<Class> all = classRepo.findAll(pageable);
    Page<ClassResp> entitysToResps = classMapper.entitysToResps(all);

    return entitysToResps;
  }

  @Override
  public void deleteById(Long id) {
    classRepo.deleteById(id);
  }

  @Override
  @Transactional
  public void update(ClassUpdateDTO classUpdateDTO) {

    Class entity = classMapper.UpdateToEntity(classUpdateDTO);

    classRepo.save(entity);

  }

  @Override
  public void add(ClassAddDTO classAddDTO) {
    Class addToEntity = classMapper.AddToEntity(classAddDTO);
    addToEntity.setCreatedAt(LocalDateTime.now());

    classRepo.save(addToEntity);
  }

  @Override
  public void batchAdd(List<ClassAddDTO> classs) {
    List<Class> entitys = classMapper.listAddDTOToEntitys(classs);
    entitys
        .stream()
        .forEach((clazz) -> clazz.setCreatedAt(LocalDateTime.now()));

    classRepo.saveAll(entitys);
  }

  @Override
  public Class findById(Long id) {
    Class clazz = classRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("user is not exist"));
    return clazz;

  }

  @Override
  @Transactional
  public void classAddCourses(AddCoursesDTO addCoursesDTO) {
    Long classId = addCoursesDTO.getClassId();
    Long termId = addCoursesDTO.getTermId();
    addCoursesDTO.getCourseId().stream()
        .forEach(courseId -> courseService.bindClassToMajor(new BindDTO(classId, courseId, termId)));
  }

}
