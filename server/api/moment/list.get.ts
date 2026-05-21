import prisma from '~/server/utils/prisma'
import { success, error } from '~/server/utils/response'
import { verifyToken } from '~/server/utils/jwt'
import { defineEventHandler, getCookie, createError, getQuery } from 'h3'

function formatDate(date: Date): string {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

const getDateRange = (timeRange: string): { start: string | null; end: string | null } => {
    const now = new Date()
    let start: string | null = null
    let end: string | null = null

    switch (timeRange) {
        case 'week':
            start = formatDate(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000))
            end = formatDate(now)
            break
        case 'month':
            start = formatDate(new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000))
            end = formatDate(now)
            break
        case 'quarter':
            start = formatDate(new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000))
            end = formatDate(now)
            break
        default:
            break
    }

    return { start, end }
}

export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'auth_token')
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
    const timeRange = query.timeRange as string||''
    
    const where: any = {}
    
    if (isLoggedIn && decoded) {
        where.publisherId = decoded.id
    }
    
    if (category && category !== 'all') {
        where.category = category
    }
    
    if (timeRange) {
        const { start, end } = getDateRange(timeRange)
        if (start && end) {
            where.date = {
                gte: start,
                lte: end
            }
        }
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
})
