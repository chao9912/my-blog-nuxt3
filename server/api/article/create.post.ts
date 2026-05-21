import {prisma} from '~/server/utils/prisma'
import { success } from '~/server/utils/response'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const article = await prisma.article.create({
        data: {
            title: body.title,
            desc: body.desc,
            content: body.content,
            cover: body.cover
        }
    })

    return success(article)
})