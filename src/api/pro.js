import request from './../utils/request'
export function getProlist() {
    return request.get('/pro/list')
}