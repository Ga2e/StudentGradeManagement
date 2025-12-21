package org.ga2e.project.module.Teacher.service.imp;

import java.util.List;

import org.ga2e.project.common.constant.RoleEnum;
import org.ga2e.project.module.Teacher.dto.TeacherAddDTO;
import org.ga2e.project.module.Teacher.dto.TeacherProfileUpdateDTO;
import org.ga2e.project.module.Teacher.dto.TeacherUpdateDTO;
import org.ga2e.project.module.Teacher.entity.TeacherProfile;
import org.ga2e.project.module.Teacher.mapper.TeacherMapper;
import org.ga2e.project.module.Teacher.repo.TeacherProfileRepo;
import org.ga2e.project.module.Teacher.service.TeacherService;
import org.ga2e.project.module.User.entity.Role;
import org.ga2e.project.module.User.entity.User;
import org.ga2e.project.module.User.repo.RoleRepo;
import org.ga2e.project.module.User.repo.UserRepo;
import org.ga2e.project.module.User.resp.TeacherResp;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class TeacherServiceImp implements TeacherService {

  private final UserRepo userRepo;
  private final RoleRepo repo;
  private final TeacherProfileRepo teacherProfileRepo;
  private final TeacherMapper teacherMapper;
  private final PasswordEncoder passwordEncoder;

  @Override
  public List<TeacherResp> findAll() {
    List<User> teachers = userRepo.findByRoleId(RoleEnum.TEACHER.getId());
    return teacherMapper.toListResp(teachers);
  }

  @Override
  public Page<TeacherResp> pageQurey(Pageable pageable) {
    Page<User> user = userRepo.findByRoleId(pageable, RoleEnum.TEACHER.getId());
    return teacherMapper.toPageReps(user);
  }

  @Override
  public TeacherResp findById(Long id) {
    User teacher = userRepo.findByIdAndRoleId(id, RoleEnum.TEACHER.getId())
        .orElseThrow(() -> new RuntimeException("teacher not exist"));
    return teacherMapper.toTeacherResp(teacher);
  }

  @Override
  @Transactional
  public void deleteById(Long id) {
    userRepo.deleteByIdAndRoleId(id, RoleEnum.TEACHER.getId());
  }

  @Override
  public void updateProfile(TeacherProfileUpdateDTO teacherProfileUpdateDTO) {
    TeacherProfile teacherProfile = teacherMapper.profileUpdateDtoToEntity(teacherProfileUpdateDTO);
    teacherProfileRepo.save(teacherProfile);
  }

  @Override
  public void updateTeacher(TeacherUpdateDTO teacherUpdateDTO) {
    User teacher = userRepo.findById(teacherUpdateDTO.getId())
        .orElseThrow(() -> new RuntimeException("teacher not exist"));
    if (!teacherUpdateDTO.getEmail().equals(teacher.getEmail())) {

      teacher.setEmail(teacherUpdateDTO.getEmail());
    }
    if (!teacherUpdateDTO.getPhone().equals(teacher.getPhone())) {

      teacher.setPhone(teacherUpdateDTO.getPhone());
    }
    String password = passwordEncoder.encode(teacherUpdateDTO.getPassword());
    if (!teacherUpdateDTO.getPassword().equals(password)) {

      teacher.setPassword(password);
    }

  }

  @Override
  @Transactional
  public void add(TeacherAddDTO teacherAddDTO) {
    User teacherAddDtoToEntity = teacherMapper.teacherAddDtoToEntity(teacherAddDTO);
    String encode = passwordEncoder.encode(teacherAddDTO.getPassword());
    teacherAddDtoToEntity.setPassword(encode);
    teacherAddDtoToEntity.getTeacherProfile().setUser(teacherAddDtoToEntity);
    Role role = repo.findById(RoleEnum.TEACHER.getId())
        .orElseThrow(() -> new RuntimeException());
    teacherAddDtoToEntity.setRole(role);
    userRepo.save(teacherAddDtoToEntity);
  }

  @Override
  public void batchAdd(List<TeacherAddDTO> teachers) {
    List<User> profileAddDtoListToEntityList = teacherMapper.profileAddDtoListToEntityList(teachers);
    userRepo.saveAll(profileAddDtoListToEntityList);
  }

}
