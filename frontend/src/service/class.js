// src/service/class.js
import instance from "./axios";

/**
 * 分页查询班级
 */
export const getClassPage = async ({ pageNum = 1, pageSize = 10 }) => {
  const res = await instance.get("/class/page", {
    params: { page: pageNum, size: pageSize, sort: "id,asc" },
  });
  return res.data.data; // { content: [...], totalElements: 66 }
};

/**
 * 获取所有班级（不分页，可用于下拉）
 */
export const getAllClass = async () => {
  const res = await instance.get("/class");
  return res.data.data;
};

/**
 * 新增班级
 */
export const addClass = async (data) => {
  const res = await instance.post("/class", data);
  return res.data;
};

/**
 * 修改班级
 */
export const updateClass = async (data) => {
  const res = await instance.put("/class", data);
  return res.data;
};

/**
 * 删除班级
 */
export const deleteClass = async (id) => {
  const res = await instance.delete(`/class/${id}`);
  return res.data;
};

/**
 * 给班级批量添加课程
 */
export const addCoursesToClass = async (data) => {
  // data: { classId, courseId: [1,2,3], termId }
  const res = await instance.post("/class/addCourse", data);
  return res.data;
};
