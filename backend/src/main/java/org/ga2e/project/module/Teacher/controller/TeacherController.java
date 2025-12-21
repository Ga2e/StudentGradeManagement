package org.ga2e.project.module.Teacher.controller;

import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.ga2e.project.common.response.ApiResult;
import org.ga2e.project.module.User.resp.TeacherResp;
import org.ga2e.project.module.Teacher.dto.TeacherAddDTO;
import org.ga2e.project.module.Teacher.dto.TeacherProfileUpdateDTO;
import org.ga2e.project.module.Teacher.dto.TeacherUpdateDTO;
import org.ga2e.project.module.Teacher.service.TeacherService;
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
@RequestMapping("/api/teacher")
@RequiredArgsConstructor
public class TeacherController {

  private final TeacherService teacherService;

  /*
   * 获取所有院校信息
   */

  @GetMapping
  public ApiResult<?> getAllTeacher() {
    return ApiResult.success(teacherService.findAll());
  }

  @GetMapping("/{id}")
  public ApiResult<TeacherResp> getById(@PathVariable Long id) {
    return ApiResult.success(teacherService.findById(id));
  }

  @GetMapping("/page")
  public ApiResult<Page<TeacherResp>> pageQurey(
      @PageableDefault(size = 10, page = 1, sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {

    return ApiResult.success(teacherService.pageQurey(pageable));

  }

  @DeleteMapping("/{id}")
  public ApiResult<?> deleteById(@PathVariable Long id) {
    teacherService.deleteById(id);
    return ApiResult.success();

  }

  @PutMapping("/profile")
  public ApiResult<?> updateProfileById(@RequestBody @Valid TeacherProfileUpdateDTO teacherProfileUpdateDTO) {
    teacherService.updateProfile(teacherProfileUpdateDTO);
    return ApiResult.success();

  }

  @PostMapping()
  public ApiResult<?> add(@Valid @RequestBody TeacherAddDTO teacherAddDTO) {
    teacherService.add(teacherAddDTO);
    return ApiResult.success();

  }

  @PutMapping()
  public ApiResult<?> updateTeacher(@RequestBody @Valid TeacherUpdateDTO teacherUpdateDTO) {
    teacherService.updateTeacher(teacherUpdateDTO);
    return ApiResult.success();

  }
}
