package org.ga2e.project.module.Professional.service;

import org.ga2e.project.module.Professional.dto.GradePlanDTO;
import org.ga2e.project.module.Professional.dto.VersionPlanDTO;
import org.ga2e.project.module.Professional.resp.GradePlanResp;
import org.ga2e.project.module.Professional.resp.VersionPlanResp;

import java.util.List;

public interface PlanService {

  // 版本培养方案相关方法
  VersionPlanResp addVersionPlan(VersionPlanDTO versionPlanDTO);
  VersionPlanResp updateVersionPlan(VersionPlanDTO versionPlanDTO);
  void deleteVersionPlan(Long id);
  VersionPlanResp getVersionPlanById(Long id);
  List<VersionPlanResp> getAllVersionPlans();
  List<VersionPlanResp> getVersionPlansByProfessionalId(Long professionalId);

  // 年级培养方案相关方法
  GradePlanResp addGradePlan(GradePlanDTO gradePlanDTO);
  GradePlanResp updateGradePlan(GradePlanDTO gradePlanDTO);
  void deleteGradePlan(Long id);
  GradePlanResp getGradePlanById(Long id);
  List<GradePlanResp> getAllGradePlans();
  List<GradePlanResp> getGradePlansByVersionPlanId(Long versionPlanId);
  List<GradePlanResp> getGradePlansByProfessionalId(Long professionalId);

  // 从版本培养方案复制生成年级培养方案
  GradePlanResp copyFromVersionPlan(Long versionPlanId, String grade, String revisionNotes);

}
