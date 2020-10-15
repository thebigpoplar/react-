import request from './../utils/request'
export function getCartlist () {// 用户购物车商品数据
    return request.get('/cart/list')
}