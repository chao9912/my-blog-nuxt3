import prisma from '~/server/utils/prisma'
import { success } from '~/server/utils/response'

export default defineEventHandler(async () => {
    const list = await prisma.moment.findMany({
        orderBy: {
            createTime: 'desc'
        }
    })

    return success(list)
})