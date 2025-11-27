package org.ga2e.project.module.Professional.controller;

import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.ga2e.project.common.response.ApiResult;
import org.ga2e.project.module.Professional.dto.ProfessionalAddDTO;
import org.ga2e.project.module.Professional.dto.ProfessionalUpdateDTO;
import org.ga2e.project.module.Professional.resp.ProfessionalResp;
import org.ga2e.project.module.Professional.service.ProfessionalService;
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

@RestController
@RequestMapping("/api/professional")
@RequiredArgsConstructor
public class ProfessionalController {

  private final ProfessionalService professionalService;

  /*
   * 获取所有院校信息
   */

  @GetMapping
  public ApiResult<?> getAllInstitute() {
    try {
      return ApiResult.success(professionalService.findAll());
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }
  }

  @GetMapping("/{id}")
  public ApiResult<ProfessionalResp> getById(@PathVariable Long id) {
    try {
      return ApiResult.success(professionalService.findById(id));
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }
  }

  @GetMapping("/page")
  public ApiResult<Page<ProfessionalResp>> pageQurey(
      @PageableDefault(size = 10, page = 1, sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
    try {
      return ApiResult.success(professionalService.pageQurey(pageable));
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }

  }

  @DeleteMapping("/{id}")
  public ApiResult<?> deleteById(@PathVariable Long id) {
    try {
      professionalService.deleteById(id);
      return ApiResult.success();
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }

  }

  @PutMapping("/")
  public ApiResult<?> updateById(@Valid ProfessionalUpdateDTO professionalUpdateDTO) {
    try {
      professionalService.update(professionalUpdateDTO);
      return ApiResult.success();
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }

  }

  @PostMapping()
  public ApiResult<?> add(@Valid ProfessionalAddDTO professionalAddDTO) {
    try {
      professionalService.add(professionalAddDTO);
      return ApiResult.success();
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }

  }

}
