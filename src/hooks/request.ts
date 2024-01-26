import axios from "axios";
const instance = axios.create({
  baseURL: "/",
  timeout: 60000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // const token = sessionStorage.getItem("token");
    // if (!token) {
    //   ElMessage.error("登录状态已失效,即将退出登录!");
    //   // TODO router.push(/login)
    // }
    return config;
  },
  function (error) {
    ElMessage.error("请求错误!");
    return Promise.reject(error);
  },
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    const { code, data, result } = response.data;
    if (code === 200) return data || result;

    ElMessage.error("请求错误!");
    console.error(response);
    return Promise.reject(new Error("请求失败!"));
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    ElMessage.error("服务器错误!");
    return Promise.reject(error);
  },
);

export const request = instance;
