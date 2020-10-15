const obj = {}
export function breadcrumNameMapFn (menus) {
    menus.map(item => {
        obj[item.path] = item.title
        if (item.children) {
            breadcrumNameMapFn(item.children) // 通过递归函数实现 
        }
    })
    return obj
}