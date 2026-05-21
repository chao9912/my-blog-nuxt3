import {prisma} from '~/server/utils/prisma'
import { success } from '~/server/utils/response'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    const id = Number(query.id)

    await prisma.moment.delete({
        where: {
            id
        }
    })

    return success(null, '删除成功')
})