import {prisma} from '~/server/utils/prisma'
import {
    success,
    error
} from '~/server/utils/response'
import { createToken } from '~/server/utils/jwt'
import { setCookie } from 'h3'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { email, password } = body

    if (!email || !password) {
        return error('请输入邮箱和密码', 400)
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return error('请输入正确的邮箱格式', 400)
    }

    const user = await prisma.user.findFirst({
        where: {
            email,
            password
        }
    })

    if (!user) {
        return error('邮箱或密码错误', 500)
    }

    const token = createToken({
        id: user.id,
        username: user.username
    })

    setCookie(event, 'auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60,
        path: '/'
    })

    return success({
        token,
        userInfo: {
            id: user.id,
            username: user.username,
            email: user.email,
            nickname: user.nickname
        }
    })
})
