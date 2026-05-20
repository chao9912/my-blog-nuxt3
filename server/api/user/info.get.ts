import prisma from '~/server/utils/prisma'
import { success, error } from '~/server/utils/response'
import { verifyToken } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
    const authorization = event.headers.get('authorization')
    if (!authorization) {
        return error('未登录', 401)
    }

    const token = authorization.replace('Bearer ', '')
    if (!token) {
        return error('未登录', 401)
    }

    try {
        const decoded = verifyToken(token) as { id: number; username: string }
        const user = await prisma.user.findFirst({
            where: {
                id: decoded.id
            },
            select: {
                id: true,
                username: true,
                email: true,
                nickname: true
            }
        })

        if (!user) {
            return error('用户不存在', 404)
        }

        return success(user)
    } catch (e) {
        return error('token 无效', 401)
    }
})