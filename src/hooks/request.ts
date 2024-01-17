import axios, { Axios, AxiosResponse } from "axios";

const request: Axios = axios.create({
  timeout: 6000,
});

// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("uniquely");
    if (!token) {
      throw new Error("Please set uniquely!");
    }
    config.headers.token = localStorage.getItem("token");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse & { code?: number }) => {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default request;
