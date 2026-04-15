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
    List<User> teachers = userRepo.findByRole_Id(RoleEnum.TEACHER.getId());
    return teacherMapper.toListResp(teachers);
  }

  @Override
  public Page<TeacherResp> pageQurey(Pageable pageable, String keyword, String type) {
    System.out.println("搜索参数: keyword=" + keyword + ", type=" + type);
    Page<User> user;
    if (keyword != null && !keyword.isEmpty()) {
      System.out.println("根据关键词搜索");
      if ("code".equals(type)) {
        System.out.println("根据工号搜索: " + keyword);
        // 根据工号进行模糊查询
        user = userRepo.findByRole_IdAndCodeContaining(pageable, RoleEnum.TEACHER.getId(), keyword);
      } else if ("name".equals(type)) {
        System.out.println("根据姓名搜索: " + keyword);
        // 根据教师姓名进行模糊查询
        user = userRepo.findByRole_IdAndTeacherProfileNameContaining(pageable, RoleEnum.TEACHER.getId(), keyword);
      } else {
        System.out.println("类型不匹配，查询所有教师");
        // 默认查询所有教师
        user = userRepo.findByRole_Id(pageable, RoleEnum.TEACHER.getId());
      }
    } else {
      System.out.println("没有关键词，查询所有教师");
      // 没有关键词，查询所有教师
      user = userRepo.findByRole_Id(pageable, RoleEnum.TEACHER.getId());
    }
    System.out.println("查询结果数量: " + user.getTotalElements());
    return teacherMapper.toPageReps(user);
  }

  @Override
  public TeacherResp findById(Long id) {
    User teacher = userRepo.findByIdAndRole_Id(id, RoleEnum.TEACHER.getId())
        .orElseThrow(() -> new RuntimeException("teacher not exist"));
    return teacherMapper.toTeacherResp(teacher);
  }

  @Override
  @Transactional
  public void deleteById(Long id) {
    userRepo.deleteByIdAndRole_Id(id, RoleEnum.TEACHER.getId());
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
    userRepo.save(teacher);

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
