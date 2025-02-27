import axios, { AxiosInstance, AxiosResponse } from 'axios';

const service: AxiosInstance = axios.create({
  baseURL: 'http://localhost:11434',
  timeout: 60000,
});

service.interceptors.request.use(
  (config: any) => {
    config.headers = {
      'Content-Type': 'application/json',
    };
    return config;
  },
  (error) => {
    console.error('请求错误:', error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error) => {
    console.error('响应错误:', error);
    return Promise.reject(error);
  }
);

export default service;