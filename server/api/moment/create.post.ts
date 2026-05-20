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
        const body = await readBody(event)

        const moment = await prisma.moment.create({
            data: {
                publisherId: decoded.id,
                title: body.title,
                desc: body.desc,
                cover: body.cover,
                tag: body.tag,
                date: body.date,
                likes: body.likes || 0,
                comments: body.comments || 0,
                views: body.views || 0,
                isVideo: body.isVideo || false,
                duration: body.duration,
                category: body.category || 'all',
                mediaUrls: body.mediaUrls
            }
        })

        return success(moment)
    } catch (e) {
        return error('token 无效', 401)
    }
})