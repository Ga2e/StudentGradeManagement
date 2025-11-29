import instance from "./axios";

export const login = async (data) => {
  try {
    const response = await instance.post(`/auth/login`, data)
    return response
  } catch (error) {
    console.error("login failed:", error);
    throw error
  }
}

export const logout = async () => {
  try {
    const response = await instance.post(`/auth/logout`)
    return response
  } catch (error) {
    console.error("logout failed:", error);
    throw error
  }
}







