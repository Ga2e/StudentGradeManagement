// src/service/teacher.js
import instance from "./axios";

/**
 * 分页查询教师
 */
export const getTeacherPage = async ({ pageNum = 1, pageSize = 10 }) => {
  const res = await instance.get("/teacher/page", {
    params: { page: pageNum - 1, size: pageSize, sort: "id,asc" },
  });
  return res.data.data; // { content: [...], totalElements: 66 }
};

/**
 * 获取所有教师（不分页，用于下拉或搜索）
 */
export const getAllTeacher = async () => {
  const res = await instance.get("/teacher");
  return res.data.data;
};

/**
 * 新增教师
 */
export const addTeacher = async (data) => {
  const res = await instance.post("/teacher", data);
  return res.data;
};

/**
 * 修改教师基本信息
 */
export const updateTeacher = async (data) => {
  const res = await instance.put("/teacher", data);
  return res.data;
};

/**
 * 更新教师个人资料（profile）
 */
export const updateTeacherProfile = async (data) => {
  const res = await instance.put("/teacher/profile", data);
  return res.data;
};

/**
 * 删除教师
 */
export const deleteTeacher = async (id) => {
  const res = await instance.delete(`/teacher/${id}`);
  return res.data;
};
