// src/service/course.js
import instance from "./axios";

/**
 * 分页查询课程
 */
export const getCoursePage = async ({ pageNum = 1, pageSize = 10 }) => {
  const res = await instance.get("/course/page", {
    params: { page: pageNum - 1, size: pageSize, sort: "id,asc" },
  });
  return res.data.data; // { content: [...], totalElements: 66 }
};

/**
 * 获取所有课程（用于下拉选择）
 */
export const getAllCourse = async () => {
  const res = await instance.get("/course");
  return res.data.data;
};

/**
 * 新增课程
 */
export const addCourse = async (data) => {
  const res = await instance.post("/course", data);
  return res.data;
};

/**
 * 修改课程
 */
export const updateCourse = async (data) => {
  const res = await instance.put("/course", data);
  return res.data;
};

/**
 * 删除课程
 */
export const deleteCourse = async (id) => {
  const res = await instance.delete(`/course/${id}`);
  return res.data;
};

/**
 * 学生选课
 */
export const electCourse = async (data) => {
  // data: { userId, courseId, termId }
  const res = await instance.post("/course/elect", data);
  return res.data;
};
