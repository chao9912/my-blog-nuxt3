// 测试数据库连接专用接口
import {prisma} from '~/server/utils/prisma'

export default defineEventHandler(async (e) => {
    try {
        // 执行一个最简单的数据库查询
        const result = await prisma.$queryRaw`SELECT 1`

        return {
            status: 'success',
            message: '✅ Supabase 数据库连接成功！',
            data: result
        }
    } catch (error) {
        return {
            status: 'error',
            message: '❌ 数据库连接失败',
            error: error?.message
        }
    }
})