package org.ga2e.project.module.Student.service.imp;

import java.util.List;

import org.ga2e.project.common.constant.RoleEnum;
import org.ga2e.project.module.Student.dto.StudentAddDTO;
import org.ga2e.project.module.Student.dto.StudentProfileUpdateDTO;
import org.ga2e.project.module.Student.dto.StudentUpdateDTO;
import org.ga2e.project.module.Student.entity.StudentProfile;
import org.ga2e.project.module.Student.mapper.StudentMapper;
import org.ga2e.project.module.Student.repo.StudentProfileRepo;
import org.ga2e.project.module.Student.service.StudentService;
import org.ga2e.project.module.User.entity.Role;
import org.ga2e.project.module.User.entity.User;
import org.ga2e.project.module.User.repo.RoleRepo;
import org.ga2e.project.module.User.repo.UserRepo;
import org.ga2e.project.module.User.resp.StudentResp;
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
public class StudentServiceImp implements StudentService {

  private final UserRepo userRepo;
  private final RoleRepo repo;
  private final StudentProfileRepo studentProfileRepo;
  private final StudentMapper studentMapper;
  private final PasswordEncoder passwordEncoder;

  @Override
  public List<StudentResp> findAll() {
    List<User> students = userRepo.findByRoleId(RoleEnum.STUDENT.getId());
    return studentMapper.toListResp(students);
  }

  @Override
  public Page<StudentResp> pageQurey(Pageable pageable) {
    Page<User> user = userRepo.findByRoleId(pageable, RoleEnum.STUDENT.getId());
    return studentMapper.toPageReps(user);
  }

  @Override
  public StudentResp findById(Long id) {
    User student = userRepo.findByIdAndRoleId(id, RoleEnum.STUDENT.getId())
        .orElseThrow(() -> new RuntimeException("student not exist"));
    return studentMapper.toStudentResp(student);
  }

  @Override
  @Transactional
  public void deleteById(Long id) {
    userRepo.deleteByIdAndRoleId(id, RoleEnum.STUDENT.getId());
  }

  @Override
  public void updateProfile(StudentProfileUpdateDTO studentProfileUpdateDTO) {
    StudentProfile studentProfile = studentMapper.profileUpdateDtoToEntity(studentProfileUpdateDTO);
    studentProfileRepo.save(studentProfile);
  }

  @Override
  public void updateStudent(StudentUpdateDTO studentUpdateDTO) {
    User student = userRepo.findById(studentUpdateDTO.getId())
        .orElseThrow(() -> new RuntimeException("student not exist"));
    if (!studentUpdateDTO.getEmail().equals(student.getEmail())) {

      student.setEmail(studentUpdateDTO.getEmail());
    }
    if (!studentUpdateDTO.getPhone().equals(student.getPhone())) {

      student.setPhone(studentUpdateDTO.getPhone());
    }
    String password = passwordEncoder.encode(studentUpdateDTO.getPassword());
    if (!studentUpdateDTO.getPassword().equals(password)) {

      student.setPassword(password);
    }

  }

  @Override
  @Transactional
  public void add(StudentAddDTO studentAddDTO) {
    User studentAddDtoToEntity = studentMapper.studentAddDtoToEntity(studentAddDTO);
    String encode = passwordEncoder.encode(studentAddDTO.getPassword());
    studentAddDtoToEntity.setPassword(encode);
    studentAddDtoToEntity.getStudentProfile().setUser(studentAddDtoToEntity);
    Role role = repo.findById(RoleEnum.STUDENT.getId())
        .orElseThrow(() -> new RuntimeException());
    studentAddDtoToEntity.setRole(role);
    userRepo.save(studentAddDtoToEntity);
  }

  @Override
  public void batchAdd(List<StudentAddDTO> students) {
    List<User> profileAddDtoListToEntityList = studentMapper.profileAddDtoListToEntityList(students);
    userRepo.saveAll(profileAddDtoListToEntityList);
  }

}
