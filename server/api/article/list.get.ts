import prisma from '~/server/utils/prisma'
import { success } from '~/server/utils/response'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    const page = Number(query.page || 1)
    const pageSize = Number(query.pageSize || 10)

    const skip = (page - 1) * pageSize

    const list = await prisma.article.findMany({
        skip,
        take: pageSize,

        orderBy: {
            createTime: 'desc'
        }
    })

    const total = await prisma.article.count()

    return success({
        list,
        total,
        page,
        pageSize
    })
})