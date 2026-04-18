package org.ga2e.project.module.Professional.mapper;

import org.ga2e.project.module.Professional.entity.GradePlan;
import org.ga2e.project.module.Professional.resp.GradePlanResp;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface GradePlanMapper {

  @Mapping(target = "id", source = "id")
  @Mapping(target = "grade", source = "grade")
  @Mapping(target = "revisionNotes", source = "revisionNotes")
  @Mapping(target = "versionPlanId", source = "versionPlan.id")
  @Mapping(target = "versionPlanNumber", source = "versionPlan.versionNumber")
  @Mapping(target = "professionalId", source = "versionPlan.professional.id")
  @Mapping(target = "professionalName", source = "versionPlan.professional.name")
  @Mapping(target = "createdAt", source = "createdAt")
  @Mapping(target = "updatedAt", source = "updatedAt")
  @Mapping(target = "courses", ignore = true)
  GradePlanResp toResp(GradePlan gradePlan);

}