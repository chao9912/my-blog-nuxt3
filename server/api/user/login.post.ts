import prisma from '~/server/utils/prisma'
import {
    success,
    error
} from '~/server/utils/response'
import { createToken } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { username, password } = body

    const user = await prisma.user.findFirst({
        where: {
            username,
            password
        }
    })

    if (!user) {
        return error('账号或密码错误', 401)
    }

    const token = createToken({
        id: user.id,
        username: user.username
    })

    return success({
        token,
        userInfo: {
            id: user.id,
            username: user.username
        }
    })
})