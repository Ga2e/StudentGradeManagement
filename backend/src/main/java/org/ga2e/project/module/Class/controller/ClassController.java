package org.ga2e.project.module.Class.controller;

import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.ga2e.project.common.response.ApiResult;
import org.ga2e.project.module.Class.dto.ClassAddDTO;
import org.ga2e.project.module.Class.dto.ClassUpdateDTO;
import org.ga2e.project.module.Class.dto.ComposeCoursesDTO;
import org.ga2e.project.module.Class.pojo.ClassCourseId;
import org.ga2e.project.module.Class.resp.ClassResp;
import org.ga2e.project.module.Class.service.ClassService;
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
@RequestMapping("/api/class")
@RequiredArgsConstructor
@Slf4j
public class ClassController {

  private final ClassService classService;

  /*
   * 获取所有院校信息
   */

  @GetMapping
  public ApiResult<?> getAllClass() {
    try {
      return ApiResult.success(classService.findAll());
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }
  }

  /*
   * 编排班级课程表
   */

  @PostMapping("/compose")
  ApiResult<?> compose(@Valid @RequestBody ComposeCoursesDTO addCoursesDTO) {
    try {
      classService.composeCourses(addCoursesDTO);
      return ApiResult.success();
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }

  }

  @GetMapping("/page")
  public ApiResult<Page<ClassResp>> pageQurey(
      @PageableDefault(size = 10, page = 1, sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
    try {
      return ApiResult.success(classService.pageQurey(pageable));
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }

  }

  @DeleteMapping("/{id}")
  public ApiResult<?> deleteById(@PathVariable Long id) {
    classService.deleteById(id);
    return ApiResult.success();

  }

  @GetMapping("/compose/delete")
  public ApiResult<?> deleteCourse(@PathVariable ClassCourseId id) {

    try

    {
      classService.deleteCourse(id);
      return ApiResult.success();
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }

  }

  @PutMapping
  public ApiResult<?> updateById(@RequestBody ClassUpdateDTO classUpdateDTO) {
    try {
      classService.update(classUpdateDTO);
      return ApiResult.success();
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }

  }

  @PostMapping()
  public ApiResult<?> add(@Valid @RequestBody ClassAddDTO classAddDTO) {
    try {
      classService.add(classAddDTO);
      return ApiResult.success();
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }

  }

}
