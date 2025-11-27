package org.ga2e.project.module.Grade.controller;

import org.ga2e.project.common.response.ApiResult;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.RequiredArgsConstructor;

public class GradeController {

  @GetMapping
  public ApiResult<?> getAllGrade() {
    try {
      return ApiResult.success(gradeService.findAll());
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }
  }

  @PostMapping("/addCourse")
  ApiResult<?> addCourse(@Valid @RequestBody AddCoursesDTO addCoursesDTO) {
    try {
      gradeService.gradeAddCourses(addCoursesDTO);
      return ApiResult.success();
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }

  }

  @GetMapping("/page")
  public ApiResult<Page<GradeResp>> pageQurey(
      @PageableDefault(size = 10, page = 1, sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
    try {
      return ApiResult.success(gradeService.pageQurey(pageable));
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }

  }

  @DeleteMapping("/{id}")
  public ApiResult<?> deleteById(@PathVariable Long id) {
    try {
      gradeService.deleteById(id);
      return ApiResult.success();
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }

  }

  @PutMapping
  public ApiResult<?> updateById(@RequestBody GradeUpdateDTO gradeUpdateDTO) {
    try {
      gradeService.update(gradeUpdateDTO);
      return ApiResult.success();
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }

  }

  @PostMapping()
  public ApiResult<?> add(@Valid @RequestBody GradeAddDTO gradeAddDTO) {
    try {
      gradeService.add(gradeAddDTO);
      return ApiResult.success();
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }

  }

}
