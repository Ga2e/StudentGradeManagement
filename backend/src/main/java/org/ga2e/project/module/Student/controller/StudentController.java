package org.ga2e.project.module.Student.controller;

import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.ga2e.project.common.response.ApiResult;
import org.ga2e.project.module.Student.dto.StudentAddDTO;
import org.ga2e.project.module.Student.dto.StudentProfileUpdateDTO;
import org.ga2e.project.module.Student.dto.StudentUpdateDTO;
import org.ga2e.project.module.User.resp.StudentResp;
import org.ga2e.project.module.Student.service.StudentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
public class StudentController {

  private final StudentService studentService;

  /*
   * 获取所有院校信息
   */

  @GetMapping
  public ApiResult<?> getAllStudent() {
    try {
      return ApiResult.success(studentService.findAll());
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }
  }

  @GetMapping("/{id}")
  public ApiResult<StudentResp> getById(@PathVariable Long id) {
    try {
      return ApiResult.success(studentService.findById(id));
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }
  }

  @GetMapping("/page")
  public ApiResult<Page<StudentResp>> pageQurey(
      @PageableDefault(size = 10, page = 1, sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
    try {

      return ApiResult.success(studentService.pageQurey(pageable));
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }

  }

  @DeleteMapping("/{id}")
  public ApiResult<?> deleteById(@PathVariable Long id) {
    try {
      studentService.deleteById(id);
      return ApiResult.success();
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }

  }

  @PutMapping("/profile")
  public ApiResult<?> updateProfileById(@RequestBody @Valid StudentProfileUpdateDTO studentProfileUpdateDTO) {
    try {
      studentService.updateProfile(studentProfileUpdateDTO);
      return ApiResult.success();
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }

  }

  @PostMapping()
  public ApiResult<?> add(@Valid @RequestBody StudentAddDTO studentAddDTO) {
    try {
      studentService.add(studentAddDTO);
      return ApiResult.success();
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }

  }

  @PutMapping("/")
  public ApiResult<?> updateStudent(@RequestBody @Valid StudentUpdateDTO studentUpdateDTO) {
    try {
      studentService.updateStudent(studentUpdateDTO);
      return ApiResult.success();
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }

  }
}
