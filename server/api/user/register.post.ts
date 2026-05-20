import prisma from '~/server/utils/prisma'
import {
    success,
    error
} from '~/server/utils/response'
import { createToken } from '~/server/utils/jwt'
import { setCookie } from 'h3'

const generateUsername = (email: string): string => {
    const match = email.match(/^([^@]+)@/)
    if (match) {
        return 'BK' + match[1]
    }
    return 'BK' + Date.now().toString(36)
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { email, password, nickname } = body

    if (!email || !password || !nickname) {
        return error('请输入邮箱、密码和昵称', 400)
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return error('请输入正确的邮箱格式', 400)
    }

    if (password.length < 6) {
        return error('密码长度不能少于6位', 400)
    }

    if (nickname.length < 1) {
        return error('昵称不能为空', 400)
    }

    const existingUser = await prisma.user.findFirst({
        where: {
            email
        }
    })

    if (existingUser) {
        return error('该邮箱已被注册', 409)
    }

    const username = generateUsername(email)

    const user = await prisma.user.create({
        data: {
            email,
            password,
            username,
            nickname
        }
    })

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
