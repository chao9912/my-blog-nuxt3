import prisma from '~/server/utils/prisma'
import { success } from '~/server/utils/response'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const moment = await prisma.moment.create({
        data: {
            content: body.content,
            images: body.images || []
        }
    })

    return success(moment)
})