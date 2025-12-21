import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 1000,
  headers: {
    "Content-Type": 'application/json'
  }
})
instance.interceptors.request.use(
  (config) => {
    // 可以在这里添加 token 等
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 统一错误处理
    return Promise.reject(error);
  }
);

export default instance
