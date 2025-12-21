package org.ga2e.project.module.Institute.controller;

import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.ga2e.project.common.response.ApiResult;
import org.ga2e.project.module.Institute.dto.InstituteAddDTO;
import org.ga2e.project.module.Institute.dto.InstituteUpdateDTO;
import org.ga2e.project.module.Institute.resp.InstituteResp;
import org.ga2e.project.module.Institute.service.InstituteService;
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
@RequestMapping("/api/institute")
@RequiredArgsConstructor
public class InstituteController {

  private final InstituteService instituteService;

  /*
   * 获取所有院校信息
   */

  @GetMapping
  public ApiResult<?> getAllInstitute() {
    try {
      return ApiResult.success(instituteService.findAll());
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }
  }

  @GetMapping("/{id}")
  public ApiResult<InstituteResp> getById(@PathVariable Long id) {
    try {
      return ApiResult.success(instituteService.findById(id));
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }
  }

  @GetMapping("/page")
  public ApiResult<Page<InstituteResp>> pageQurey(
      @PageableDefault(size = 10, page = 1, sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
    try {

      return ApiResult.success(instituteService.pageQurey(pageable));
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }

  }

  @DeleteMapping("/{id}")
  public ApiResult<?> deleteById(@PathVariable Long id) {
    instituteService.deleteById(id);
    return ApiResult.success();

  }

  @PutMapping()
  public ApiResult<?> updateById(@RequestBody @Valid InstituteUpdateDTO instituteUpdateDTO) {
    try {
      instituteService.update(instituteUpdateDTO);
      return ApiResult.success();
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }

  }

  @PostMapping()
  public ApiResult<?> add(@Valid @RequestBody InstituteAddDTO instituteAddDTO) {
    try {
      instituteService.add(instituteAddDTO);
      return ApiResult.success();
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }

  }

}
