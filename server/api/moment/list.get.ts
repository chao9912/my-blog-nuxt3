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
        
        const query = getQuery(event)
        const page = parseInt(query.page as string) || 1
        const pageSize = parseInt(query.pageSize as string) || 8
        const category = query.category as string
        
        const where: any = { publisherId: decoded.id }
        if (category && category !== 'all') {
            where.category = category
        }
        
        const [list, total] = await Promise.all([
            prisma.moment.findMany({
                where,
                orderBy: {
                    createTime: 'desc'
                },
                skip: (page - 1) * pageSize,
                take: pageSize
            }),
            prisma.moment.count({ where })
        ])

        return success({
            list,
            total,
            page,
            pageSize,
            totalPages: Math.ceil(total / pageSize)
        })
    } catch (e) {
        return error('token 无效', 401)
    }
})
