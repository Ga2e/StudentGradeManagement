// src/service/grade.js
import instance from "./axios";

/**
 * 分页查询成绩（管理员用）
 */
export const getGradePage = async ({ pageNum = 1, pageSize = 10 }) => {
  const res = await instance.get("/grade/page", {
    params: { page: pageNum - 1, size: pageSize, sort: "id,asc" },
  });
  return res.data.data; // Page<GradeResp>
};

/**
 * 获取所有成绩（不分页，用于特殊场景）
 */
export const getAllGrade = async () => {
  const res = await instance.get("/grade");
  return res.data.data;
};

/**
 * 录入成绩（单个）
 */
export const addGrade = async (data) => {
  const res = await instance.post("/grade", data);
  return res.data;
};

/**
 * 批量录入成绩（如果后端支持）
 */
export const addGrades = async (data) => {
  const res = await instance.post("/grade/addCourse", data);
  return res.data;
};

/**
 * 修改成绩
 */
export const updateGrade = async (data) => {
  const res = await instance.put("/grade", data);
  return res.data;
};

/**
 * 删除成绩
 */
export const deleteGrade = async (id) => {
  const res = await instance.delete(`/grade/${id}`);
  return res.data;
};

/**
 * 管理员查看某学生所有成绩（选修 + 必修）
 */
export const getStudentGrades = async (studentId) => {
  const res = await instance.get(`/grade/admin/search/${studentId}`);
  return res.data.data; // StudentGradeResp { electives: [...], majors: [...] }
};

/**
 * 当前登录学生查看自己的成绩
 */
export const getMyGrades = async () => {
  const res = await instance.get("/grade/me");
  return res.data.data; // List<GradeResp>
};
