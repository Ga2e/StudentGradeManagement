// src/service/professional.js
import instance from "./axios";

/**
 * 分页查询专业（后端 page 从 1 开始，前端也从 1 开始传）
 */
export const getProfessionalPage = async ({ pageNum = 1, pageSize = 10 }) => {
  const res = await instance.get("/professional/page", {
    params: {
      page: pageNum - 1,
      size: pageSize,
      sort: "id,asc",
    },
  });
  return res.data; // { content: [...], totalElements: 88 }
};

/**
 * 新增专业
 */
export const addProfessional = async (data) => {
  const res = await instance.post("/professional", data);
  return res.data;
};

/**
 * 修改专业（PUT + 传 {id, name}）
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
};
