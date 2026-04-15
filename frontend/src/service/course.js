// src/service/course.js
import instance from "./axios";

/**
 * 分页查询课程
 */
export const getCoursePage = async ({ pageNum = 1, pageSize = 10 }) => {
  try {
    const res = await instance.get("/course/page", {
      params: { page: pageNum - 1, size: pageSize, sort: "id,asc" },
    });
    console.log('getCoursePage API 响应:', res);
    console.log('getCoursePage API 响应 data:', res.data);
    console.log('getCoursePage API 响应 data.data:', res.data.data);
    return res.data.data; // { content: [...], totalElements: 66 }
  } catch (error) {
    console.error('getCoursePage API 错误:', error);
    throw error;
  }
};

/**
 * 获取所有课程（用于下拉选择）
 */
export const getAllCourse = async () => {
  const res = await instance.get("/course");
  return res.data;
};

/**
 * 新增课程
 */
export const addCourse = async (data) => {
  const res = await instance.post("/course", data);
  return res.data;
};

/**
 * 删除课程
 */
export const deleteCourse = async (id) => {
  console.log('删除课程 API 请求:', `/course/${id}`);
  try {
    const res = await instance.delete(`/course/${id}`);
    console.log('删除课程 API 响应:', res);
    return res.data;
  } catch (error) {
    console.error('删除课程 API 错误:', error);
    throw error;
  }
};
