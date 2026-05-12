import prisma from '~/server/utils/prisma'
import {
    success,
    error
} from '~/server/utils/response'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    const id = Number(query.id)

    const article = await prisma.article.findUnique({
        where: {
            id
        }
    })

    if (!article) {
        return error('文章不存在', 404)
    }

    return success(article)
})