import prisma from '~/server/utils/prisma'
import { success, error } from '~/server/utils/response'
import { verifyToken } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
    const authorization = event.headers.get('authorization')
    const token = authorization?.replace('Bearer ', '')
    
    let isLoggedIn = false
    let decoded: { id: number; username: string } | null = null
    
    if (token) {
        try {
            decoded = verifyToken(token) as { id: number; username: string }
            isLoggedIn = true
        } catch (e) {
            isLoggedIn = false
        }
    }
    
    const query = getQuery(event)
    const page = parseInt(query.page as string) || 1
    const pageSize = parseInt(query.pageSize as string) || 8
    const category = query.category as string
    
    if (isLoggedIn && decoded) {
        const where: any = { publisherId: decoded.id }
        if (category && category !== 'all') {
            where.category = category
        }
        
        const [list, total] = await Promise.all([
            prisma.moment.findMany({
                where,
                orderBy: {
                    createTime: 'desc'
                },
                skip: (page - 1) * pageSize,
                take: pageSize
            }),
            prisma.moment.count({ where })
        ])

        return success({
            list,
            total,
            page,
            pageSize,
            totalPages: Math.ceil(total / pageSize)
        })
    } else {
        const where: any = {}
        if (category && category !== 'all') {
            where.category = category
        }
        
        const [list, total] = await Promise.all([
            prisma.moment.findMany({
                where,
                orderBy: {
                    createTime: 'desc'
                }
            }),
            prisma.moment.count({ where })
        ])
        
        const shuffled = [...list].sort(() => Math.random() - 0.5)
        const start = (page - 1) * pageSize
        const end = start + pageSize
        const paginatedList = shuffled.slice(start, end)
        
        return success({
            list: paginatedList,
            total,
            page,
            pageSize,
            totalPages: Math.ceil(total / pageSize)
        })
    }
})
