package org.ga2e.project.module.Course.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.ga2e.project.common.response.ApiResult;
import org.ga2e.project.module.Course.dto.CourseAddDTO;
import org.ga2e.project.module.Course.dto.CourseUpdateDTO;
import org.ga2e.project.module.Course.dto.ElectCourseDTO;
import org.ga2e.project.module.Course.resp.CourseResp;
import org.ga2e.project.module.Course.service.CourseService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/course")
@RequiredArgsConstructor
public class CourseController {
  private final CourseService courseService;

  /*
   * 获取所有院校信息
   */

  @GetMapping
  public ApiResult<?> getAllCourse() {
    try {
      return ApiResult.success(courseService.findAll());
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }
  }

  @GetMapping("/{id}")
  public ApiResult<CourseResp> getById(@PathVariable Long id) {
    try {
      return ApiResult.success(courseService.findById(id));
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }
  }

  @GetMapping("/page")
  public ApiResult<Page<CourseResp>> pageQurey(
      @PageableDefault(size = 10, page = 1, sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
    try {
      return ApiResult.success(courseService.pageQurey(pageable));
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }

  }

  @DeleteMapping("/{id}")
  public ApiResult<?> deleteById(@PathVariable Long id) {
    try {
      courseService.deleteById(id);
      return ApiResult.success();
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }

  }

  @PutMapping()
  public ApiResult<?> updateById(@RequestBody @Valid CourseUpdateDTO courseUpdateDTO) {
    try {
      courseService.update(courseUpdateDTO);
      return ApiResult.success();
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }

  }

  @PostMapping()
  public ApiResult<?> add(@RequestBody @Valid CourseAddDTO courseAddDTO) {
    try {
      courseService.add(courseAddDTO);
      return ApiResult.success();
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }

  }

  @PostMapping("/elect")
  public ApiResult<?> electCourse(@RequestBody ElectCourseDTO electCourseDTO) {
    try {
      courseService.electCourse(electCourseDTO);
      return ApiResult.success();
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }

  }

}
