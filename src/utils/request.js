import axios from 'axios'
import { getStorage } from './storage'
const isDev = process.env.NODE_ENV === 'development'
const request = axios.create({
    baseURL: isDev ? 'http://127.0.0.1:3001/react' : 'http://39.100.30.156:3000/react'
})
//请求拦截
// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // 在发送请求之前 统一在头信息传递token
    config.headers.common.token = getStorage('token')
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 对响应数据做点什么 判断token的时效
    if (response.data.code === '10119') {
        window.location.href = "http://localhost:3000/#/login"
    }
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default request