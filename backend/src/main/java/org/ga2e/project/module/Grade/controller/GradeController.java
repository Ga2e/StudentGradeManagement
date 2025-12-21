package org.ga2e.project.module.Grade.controller;

import java.util.List;

import org.ga2e.project.common.response.ApiResult;
import org.ga2e.project.module.Grade.dto.GradeAddDTO;
import org.ga2e.project.module.Grade.dto.GradeUpdateDTO;
import org.ga2e.project.module.Grade.resp.GradeResp;
import org.ga2e.project.module.Grade.resp.StudentGradeResp;
import org.ga2e.project.module.Grade.service.GradeService;
import org.ga2e.project.module.User.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/grade")
@RequiredArgsConstructor
public class GradeController {

  private final GradeService gradeService;

  @GetMapping
  public ApiResult<?> getAllGrade() {
    try {
      return ApiResult.success(gradeService.findAll());
    } catch (

    Exception e) {
      return ApiResult.error(e.getMessage());
    }
  }

  @PostMapping("/addCourse")
  ApiResult<?> addCourse(@Valid @RequestBody GradeAddDTO addCoursesDTO) {
    try {
      gradeService.add(addCoursesDTO);
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

  @GetMapping("/admin/search")
  public ApiResult<?> findStudentGrade(@PathVariable Long id) {

    try {
      StudentGradeResp studentGradeResp = StudentGradeResp.builder()
          .electives(gradeService.findElectiveGradesByStudentId(id))
          .majors(gradeService.findMajorGradesByStudentId(id))
          .build();
      return ApiResult.success(studentGradeResp);
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }

  }

  @GetMapping("/me")
  public ApiResult<?> findMeGrade(Authentication authentication) {
    try {
      List<GradeResp> grades = gradeService.findMeGrade(authentication);
      return ApiResult.success(grades);
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }

  }

}
