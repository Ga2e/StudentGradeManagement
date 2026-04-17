package org.ga2e.project.module.Professional.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.ga2e.project.common.response.ApiResult;
import org.ga2e.project.module.Professional.dto.GradePlanDTO;
import org.ga2e.project.module.Professional.dto.VersionPlanDTO;
import org.ga2e.project.module.Professional.resp.GradePlanResp;
import org.ga2e.project.module.Professional.resp.VersionPlanResp;
import org.ga2e.project.module.Professional.service.PlanService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plan")
@RequiredArgsConstructor
@Slf4j
public class PlanController {

  private final PlanService planService;

  // 版本培养方案相关接口
  @PostMapping("/version")
  public ApiResult<VersionPlanResp> addVersionPlan(@RequestBody @Valid VersionPlanDTO versionPlanDTO) {
    try {
      return ApiResult.success(planService.addVersionPlan(versionPlanDTO));
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }
  }

  @PutMapping("/version")
  public ApiResult<VersionPlanResp> updateVersionPlan(@RequestBody @Valid VersionPlanDTO versionPlanDTO) {
    try {
      return ApiResult.success(planService.updateVersionPlan(versionPlanDTO));
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }
  }

  @DeleteMapping("/version/{id}")
  public ApiResult<?> deleteVersionPlan(@PathVariable Long id) {
    try {
      planService.deleteVersionPlan(id);
      return ApiResult.success();
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }
  }

  @GetMapping("/version/{id}")
  public ApiResult<VersionPlanResp> getVersionPlanById(@PathVariable Long id) {
    try {
      return ApiResult.success(planService.getVersionPlanById(id));
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }
  }

  @GetMapping("/version")
  public ApiResult<List<VersionPlanResp>> getAllVersionPlans() {
    try {
      return ApiResult.success(planService.getAllVersionPlans());
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }
  }

  @GetMapping("/version/professional/{professionalId}")
  public ApiResult<List<VersionPlanResp>> getVersionPlansByProfessionalId(@PathVariable Long professionalId) {
    try {
      return ApiResult.success(planService.getVersionPlansByProfessionalId(professionalId));
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }
  }

  // 年级培养方案相关接口
  @PostMapping("/grade")
  public ApiResult<GradePlanResp> addGradePlan(@RequestBody @Valid GradePlanDTO gradePlanDTO) {
    try {
      return ApiResult.success(planService.addGradePlan(gradePlanDTO));
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }
  }

  @PutMapping("/grade")
  public ApiResult<GradePlanResp> updateGradePlan(@RequestBody @Valid GradePlanDTO gradePlanDTO) {
    try {
      return ApiResult.success(planService.updateGradePlan(gradePlanDTO));
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }
  }

  @DeleteMapping("/grade/{id}")
  public ApiResult<?> deleteGradePlan(@PathVariable Long id) {
    try {
      planService.deleteGradePlan(id);
      return ApiResult.success();
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }
  }

  @GetMapping("/grade/{id}")
  public ApiResult<GradePlanResp> getGradePlanById(@PathVariable Long id) {
    try {
      return ApiResult.success(planService.getGradePlanById(id));
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }
  }

  @GetMapping("/grade")
  public ApiResult<List<GradePlanResp>> getAllGradePlans() {
    try {
      return ApiResult.success(planService.getAllGradePlans());
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }
  }

  @GetMapping("/grade/version/{versionPlanId}")
  public ApiResult<List<GradePlanResp>> getGradePlansByVersionPlanId(@PathVariable Long versionPlanId) {
    try {
      return ApiResult.success(planService.getGradePlansByVersionPlanId(versionPlanId));
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }
  }

  @GetMapping("/grade/professional/{professionalId}")
  public ApiResult<List<GradePlanResp>> getGradePlansByProfessionalId(@PathVariable Long professionalId) {
    try {
      return ApiResult.success(planService.getGradePlansByProfessionalId(professionalId));
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }
  }

  // 从版本培养方案复制生成年级培养方案
  @PostMapping("/copy")
  public ApiResult<GradePlanResp> copyFromVersionPlan(@RequestParam Long versionPlanId, @RequestParam String grade, @RequestParam(required = false) String revisionNotes) {
    try {
      return ApiResult.success(planService.copyFromVersionPlan(versionPlanId, grade, revisionNotes));
    } catch (Exception e) {
      return ApiResult.error(e.getMessage());
    }
  }

}
