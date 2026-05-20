// server/middleware/auth.ts
import { defineEventHandler, getCookie, createError } from 'h3'

// 🔥 核心优化1：抽离白名单常量，单独维护，一目了然
const AUTH_WHITE_LIST = [
    '/api/user/login',
    '/api/user/register',
    '/api/moment/list'
]

export default defineEventHandler((event) => {
    const { path } = event

    // 核心优化2：非接口请求直接放行
    if (!path.startsWith('/api/')) return

    // 核心优化3：白名单接口直接放行（简洁判断）
    const isWhiteList = AUTH_WHITE_LIST.some(prefix => path.startsWith(prefix))
    if (isWhiteList) return

    // 核心优化4：简化鉴权逻辑，代码更干净
    const token = getCookie(event, 'auth_token')
    if (!token) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Unauthorized',
            message: '请先登录'
        })
    }

    // 挂载Token到上下文
    event.context.auth = { token }
})