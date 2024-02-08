import axios from "axios";
const instance = axios.create({
  baseURL: "/",
  timeout: 60000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    const openApi = config.headers?.openApi || false;
    // 如果是开发接口
    if (openApi) {
      return config;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      ElMessage.error("登录状态失效, 即将退出登录!");
      setTimeout(() => {
        localStorage.clear();
        location.href = location.origin + "/#/login";
      }, 1000);
    }
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
