// src/service/professional.js
import instance from "./axios";

/**
 * 分页查询专业（后端 page 从 1 开始，前端也从 1 开始传）
 */
export const getProfessionalPage = async ({ pageNum = 1, pageSize = 10 }) => {
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
};

/**
 * 新增专业
 */
export const addProfessional = async (data) => {
  console.log("新增专业请求数据:", data);
  try {
    const res = await instance.post("/professional", data);
    console.log("新增专业响应数据:", res);
    return res.data.data;
  } catch (error) {
    console.error("新增专业API调用失败:", error);
    throw error;
  }
};

/**
 * 修改专业（PUT + 传 {id, name,instituteId}）
 */
export const updateProfessional = async (data) => {
  const res = await instance.put("/professional/", data);
  return res.data.data;
};

/**
 * 删除专业
 */
export const deleteProfessional = async (id) => {
  const res = await instance.delete(`/professional/${id}`);
  return res.data;
};
