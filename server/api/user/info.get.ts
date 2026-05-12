import prisma from '~/server/utils/prisma'
import { success } from '~/server/utils/response'

export default defineEventHandler(async () => {
    const user = await prisma.user.findFirst()

    return success(user)
})