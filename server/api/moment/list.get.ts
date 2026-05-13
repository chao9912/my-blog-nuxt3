import prisma from '~/server/utils/prisma'
import { success } from '~/server/utils/response'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const page = parseInt(query.page as string) || 1
    const pageSize = parseInt(query.pageSize as string) || 8
    
    const [list, total] = await Promise.all([
        prisma.moment.findMany({
            orderBy: {
                createTime: 'desc'
            },
            skip: (page - 1) * pageSize,
            take: pageSize
        }),
        prisma.moment.count()
    ])

    return success({
        list,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize)
    })
})
