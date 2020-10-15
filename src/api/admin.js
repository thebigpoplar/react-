import request from './../utils/request'
export function getAdminlist () {// 用户购物车商品数据
    return request.get('/admin/list')
}
export function addAdmin (parmas) {// 用户购物车商品数据
    return request.post('/admin/add',parmas)
}
export function deleteAdmin (parmas) {// 用户购物车商品数据
    return request.post('/admin/delete',parmas)
}
export function findAdmin (parmas) {// 用户购物车商品数据
    return request.post('/admin/find',parmas)
}
export function updataAdmin (parmas) {// 用户购物车商品数据
    return request.post('/admin/updata',parmas)
}