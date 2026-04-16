// src/service/professional.js
import instance from "./axios";

/**
 * 分页查询专业（后端 page 从 1 开始，前端也从 1 开始传）
 */
export const getProfessionalPage = async ({ pageNum = 1, pageSize = 10 }) => {
<<<<<<< HEAD
  console.log("查询专业分页数据参数:", { pageNum, pageSize });
  try {
    const res = await instance.get("/professional/page", {
      params: {
        page: pageNum - 1,
        size: pageSize,
        sort: "id,asc",
      },
    });
    console.log("查询专业分页数据响应:", res);
    return res.data; // { content: [...], totalElements: 88 }
  } catch (error) {
    console.error("查询专业分页数据失败:", error);
    throw error;
  }
=======
  const res = await instance.get("/professional/page", {
    params: {
      page: pageNum - 1,
      size: pageSize,
      sort: "id,asc",
    },
  });
  return res.data; // { code: 200, message: "OK", data: { content: [...], totalElements: 88 } }
>>>>>>> 5164162423a6ec7c8bc3f3ff504fc9a6385753ee
};

/**
 * 新增专业
 */
export const addProfessional = async (data) => {
<<<<<<< HEAD
  console.log("新增专业请求数据:", data);
  try {
    const res = await instance.post("/professional", data);
    console.log("新增专业响应数据:", res);
    return res.data.data;
  } catch (error) {
    console.error("新增专业API调用失败:", error);
    throw error;
  }
=======
  const res = await instance.post("/professional", data);
  return res.data;
>>>>>>> 5164162423a6ec7c8bc3f3ff504fc9a6385753ee
};

/**
 * 修改专业（PUT + 传 {id, name,instituteId}）
 */
export const updateProfessional = async (data) => {
  const res = await instance.put("/professional/", data);
  return res.data;
};

/**
 * 删除专业
 */
export const deleteProfessional = async (id) => {
  const res = await instance.delete(`/professional/${id}`);
  return res.data;
<<<<<<< HEAD
=======
};

/**
 * 添加培养方案
 */
export const addProfessionalPlan = async (data) => {
  const res = await instance.post("/professional/plan", data);
  return res.data;
};

/**
 * 获取专业的培养方案
 */
export const getProfessionalPlan = async (professionalId) => {
  const res = await instance.get(`/professional/plan/${professionalId}`);
  return res.data;
};

/**
 * 获取所有培养方案
 */
export const getAllProfessionalPlans = async () => {
  const res = await instance.get("/professional/plan");
  return res.data;
};

/**
 * 删除培养方案
 */
export const deleteProfessionalPlan = async (professionalId) => {
  const res = await instance.delete(`/professional/plan/${professionalId}`);
  return res.data;
>>>>>>> 5164162423a6ec7c8bc3f3ff504fc9a6385753ee
};
