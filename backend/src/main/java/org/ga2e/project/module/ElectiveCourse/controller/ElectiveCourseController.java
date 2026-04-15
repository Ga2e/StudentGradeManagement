package org.ga2e.project.module.ElectiveCourse.controller;

import java.util.List;

import org.ga2e.project.common.response.ApiResult;
import org.ga2e.project.module.ElectiveCourse.dto.ElectiveCourseAddDTO;
import org.ga2e.project.module.ElectiveCourse.resp.ElectiveCourseResp;
import org.ga2e.project.module.ElectiveCourse.service.ElectiveCourseService;
import org.ga2e.project.module.User.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/elective-course")
public class ElectiveCourseController {

  @Autowired
  private ElectiveCourseService electiveCourseService;

  @PostMapping
  public ApiResult<?> add(@Valid @RequestBody ElectiveCourseAddDTO electiveCourseAddDTO) {
    try {
      User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
      electiveCourseService.add(electiveCourseAddDTO, user.getId());
      return ApiResult.success();
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }
  }

  @DeleteMapping("/{id}")
  public ApiResult<?> delete(@PathVariable Long id) {
    try {
      User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
      electiveCourseService.delete(id, user.getId());
      return ApiResult.success();
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }
  }

  @GetMapping
  public ApiResult<?> findByUserId() {
    try {
      User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
      List<ElectiveCourseResp> resp = electiveCourseService.findByUserId(user.getId());
      return ApiResult.success(resp);
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }
  }

  @GetMapping("/term/{termId}")
  public ApiResult<?> findByUserIdAndTermId(@PathVariable Long termId) {
    try {
      User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
      List<ElectiveCourseResp> resp = electiveCourseService.findByUserIdAndTermId(user.getId(), termId);
      return ApiResult.success(resp);
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }
  }

}
