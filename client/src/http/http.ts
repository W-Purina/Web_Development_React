import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  config => {
    // 在这里你可以做一些请求前的操作，比如添加 token 到 headers
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  response => {
    // 在这里你可以做一些响应的处理，比如统一处理错误消息
    if (response.data.error) {
      console.error(response.data.error);
    }
    return response.data;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;
