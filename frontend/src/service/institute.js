import { ExceptionMap } from "antd/es/result";
import instance from "./axios";

export const getAllInstitute = async () => {
  try {
    const response = await instance.get("/institute")
    return response.data
  } catch (error) {
    console.error("获取学院数据失败:", error);
    throw error
  }
}

export const addInstitute = async (data) => {
  try {
    const response = await instance.post(`/institute`, data)
    return response.data
  } catch (error) {
    console.error("添加学院数据失败:", error);
    throw error
  }
}


export const getInstituteById = async (id) => {
  try {
    const response = await instance.get(`/institute/${id}`)
    return response.data
  } catch (error) {
    console.error("获取学院数据失败:", error);
    throw error
  }
}

export const getPages = async ({ pageNum = 0, pageSize = 10, sort = 'id', direction = 'asc' }) => {
  try {

    const response = await instance.get(`/institute/page`, { params: { page: pageNum, size: 10, sort: `${sort},${direction}`, } })
    console.log(response)
    return response.data
  } catch (error) {
    console.error("获取学院数据失败:", error);
    throw error
  }
}

export const updateInstitute = async ({ id, name }) => {
  try {
    console.log(id)
    const response = await instance.put(`/institute`, { id, name })
    if (response.code === 200) {

      return response.data
    } else {
    }
  } catch (error) {
    console.error("删除学院数据失败:", error);
    throw error
  }
}


export const deleteInstituteById = async (id) => {
  try {
    console.log(id)
    const response = (await instance.delete(`/institute/${id}`))
    if (response.code === 200) {

      return response.data
    } else {
    }
  } catch (error) {
    console.error("删除学院数据失败:", error);
    throw error
  }
}


