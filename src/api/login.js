import request from './../utils/request'
export function login (params) {// 登录接口
    return request.post('/admin/login', params)
}