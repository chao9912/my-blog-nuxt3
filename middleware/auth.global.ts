// middleware/auth.global.ts （global 代表全局生效）
export default defineNuxtRouteMiddleware((to, from) => {
    // 放行公开页面
    const publicPages = [] as any
    if (!publicPages.includes(to.path)) return

    // 页面端判断登录态（HttpOnly Cookie 前端JS读不到，用接口校验）
    const user = useAsyncData('user', () => $fetch('/api/user'))

    // 未登录 → 跳转到登录页
    if (!user.data.value) {
        // return navigateTo('/login')
    }
})