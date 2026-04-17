package org.ga2e.project.module.Professional.controller;

import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.ga2e.project.common.response.ApiResult;
import org.ga2e.project.module.Professional.dto.ProfessionalAddDTO;
import org.ga2e.project.module.Professional.dto.ProfessionalPlanDTO;
import org.ga2e.project.module.Professional.dto.ProfessionalUpdateDTO;
import org.ga2e.project.module.Professional.resp.ProfessionalPlanResp;
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
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/professional")
@RequiredArgsConstructor
@Slf4j
public class ProfessionalController {

  private final ProfessionalService professionalService;

  /*
   * 获取所有院校信息
   */

  @GetMapping
  public ApiResult<?> getAllProfessional() {
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
    professionalService.deleteById(id);
    return ApiResult.success();

  }

  @DeleteMapping("/batch")
  public ApiResult<?> deleteBatch(@RequestBody List<Long> ids) {
    for (Long id : ids) {
      professionalService.deleteById(id);
    }
    return ApiResult.success();

  }

  @PutMapping("/")
  public ApiResult<?> updateById(@RequestBody @Valid ProfessionalUpdateDTO professionalUpdateDTO) {
    professionalService.update(professionalUpdateDTO);
    return ApiResult.success();

  }

  @PostMapping()
  public ApiResult<?> add(@RequestBody @Valid ProfessionalAddDTO professionalAddDTO) {
    try {
      professionalService.add(professionalAddDTO);
      return ApiResult.success();
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }

  }

  // 培养方案相关接口
  @PostMapping("/plan")
  public ApiResult<?> addPlan(@RequestBody @Valid ProfessionalPlanDTO professionalPlanDTO) {
    try {
      professionalService.addPlan(professionalPlanDTO);
      return ApiResult.success();
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }
  }

  @GetMapping("/plan/{professionalId}")
  public ApiResult<ProfessionalPlanResp> getPlanByProfessionalId(@PathVariable Long professionalId) {
    try {
      return ApiResult.success(professionalService.getPlanByProfessionalId(professionalId));
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }
  }

  @GetMapping("/plan")
  public ApiResult<?> getAllPlans() {
    try {
      return ApiResult.success(professionalService.getAllPlans());
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }
  }

  @DeleteMapping("/plan/{professionalId}")
  public ApiResult<?> deletePlan(@PathVariable Long professionalId) {
    try {
      professionalService.deletePlan(professionalId);
      return ApiResult.success();
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }
  }

  @DeleteMapping("/plan/{professionalId}/{version}/{grade}")
  public ApiResult<?> deletePlanByVersionAndGrade(@PathVariable Long professionalId, @PathVariable String version, @PathVariable String grade) {
    try {
      professionalService.deletePlanByVersionAndGrade(professionalId, version, grade);
      return ApiResult.success();
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }
  }

}
