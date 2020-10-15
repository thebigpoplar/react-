export function setStorage (key, value) {
    sessionStorage.setItem(key, value)
}
export function getStorage (key) {
    return sessionStorage.getItem(key)
}
export function removeStorage (key) {
    sessionStorage.removeItem(key)
}

// 也可以用 js-cookie 下载第三方依赖包 