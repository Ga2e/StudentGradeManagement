// src/service/plan.js
import instance from "./axios";

/**
 * 添加版本培养方案
 */
export const addVersionPlan = async (data) => {
  const res = await instance.post("/plan/version", data);
  return res.data;
};

/**
 * 更新版本培养方案
 */
export const updateVersionPlan = async (data) => {
  const res = await instance.put("/plan/version", data);
  return res.data;
};

/**
 * 删除版本培养方案
 */
export const deleteVersionPlan = async (id) => {
  const res = await instance.delete(`/plan/version/${id}`);
  return res.data;
};

/**
 * 获取所有版本培养方案
 */
export const getAllVersionPlans = async () => {
  const res = await instance.get("/plan/version");
  return res.data;
};

/**
 * 根据专业ID获取版本培养方案
 */
export const getVersionPlansByProfessionalId = async (professionalId) => {
  const res = await instance.get(`/plan/version/professional/${professionalId}`);
  return res.data;
};

/**
 * 添加年级培养方案
 */
export const addGradePlan = async (data) => {
  const res = await instance.post("/plan/grade", data);
  return res.data;
};

/**
 * 更新年级培养方案
 */
export const updateGradePlan = async (data) => {
  const res = await instance.put("/plan/grade", data);
  return res.data;
};

/**
 * 删除年级培养方案
 */
export const deleteGradePlan = async (id) => {
  const res = await instance.delete(`/plan/grade/${id}`);
  return res.data;
};

/**
 * 获取所有年级培养方案
 */
export const getAllGradePlans = async () => {
  const res = await instance.get("/plan/grade");
  return res.data;
};

/**
 * 根据版本培养方案ID获取年级培养方案
 */
export const getGradePlansByVersionPlanId = async (versionPlanId) => {
  const res = await instance.get(`/plan/grade/version/${versionPlanId}`);
  return res.data;
};

/**
 * 从版本培养方案复制生成年级培养方案
 */
export const copyFromVersionPlan = async (versionPlanId, grade, revisionNotes) => {
  const res = await instance.post("/plan/copy", null, {
    params: {
      versionPlanId,
      grade,
      revisionNotes
    }
  });
  return res.data;
};
