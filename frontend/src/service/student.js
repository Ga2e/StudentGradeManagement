// src/service/student.js
import instance from "./axios";

/**
 * 分页查询学生
 */
export const getStudentPage = async ({ pageNum = 1, pageSize = 10 }) => {
  const res = await instance.get("/student/page", {
    params: { page: pageNum - 1, size: pageSize, sort: "id,asc" },
  });
  return res.data.data; // { content: [...], totalElements: 66 }
};

/**
 * 获取所有学生（不分页，用于下拉或搜索）
 */
export const getAllStudent = async () => {
  const res = await instance.get("/student");
  return res.data.data;
};

/**
 * 新增学生
 */
export const addStudent = async (data) => {
  const res = await instance.post("/student", data);
  return res.data;
};

/**
 * 修改学生基本信息（邮箱、手机、密码）
 */
export const updateStudent = async (data) => {
  const res = await instance.put("/student", data);
  return res.data;
};

/**
 * 更新学生个人资料（profile）
 */
export const updateStudentProfile = async (data) => {
  const res = await instance.put("/student/profile", data);
  return res.data;
};

/**
 * 删除学生
 */
export const deleteStudent = async (id) => {
  const res = await instance.delete(`/student/${id}`);
  return res.data;
};
