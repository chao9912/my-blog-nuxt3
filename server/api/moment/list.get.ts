import prisma from '~/server/utils/prisma'
import { success } from '~/server/utils/response'

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const page = parseInt(query.page as string) || 1
    const pageSize = parseInt(query.pageSize as string) || 8
    
    const [rawList, total] = await Promise.all([
        prisma.moment.findMany({
            orderBy: {
                createTime: 'desc'
            },
            skip: (page - 1) * pageSize,
            take: pageSize
        }),
        prisma.moment.count()
    ])

    const list = rawList.map(item => {
        try {
            const content = typeof item.content === 'string' ? JSON.parse(item.content) : item.content
            return {
                id: item.id,
                ...content,
                createTime: item.createTime
            }
        } catch {
            return {
                id: item.id,
                title: '未知标题',
                desc: '',
                cover: '',
                tag: '其他',
                date: item.createTime?.toISOString().split('T')[0] || '',
                likes: 0,
                comments: 0,
                views: 0,
                createTime: item.createTime
            }
        }
    })

    return success({
        list,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize)
    })
})