// src/utils/request.js
import axios from 'axios';

// 创建一个 axios 实例
const request = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || '/api', // 可通过 .env 配置
  timeout: 10000, // 10秒超时
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器（可选）
request.interceptors.request.use(
  (config) => {
    // 例如：添加 token
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    console.log('发送请求:', config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器（可选）
request.interceptors.response.use(
  (response) => {
    // 根据后端数据结构调整，比如 response.data.code === 200
    return response.data; // 直接返回 data 部分，避免到处写 .data
  },
  (error) => {
    console.error('请求失败:', error);
    // 可统一提示错误（如使用 message）
    // this.$message.error('请求出错，请重试');
    return Promise.reject(error);
  }
);


export default request;
