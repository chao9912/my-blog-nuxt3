import { defineEventHandler, readMultipartFormData, createError } from 'h3'
import fs from 'fs/promises'
import path from 'path'
import crypto from 'crypto'
import { verifyToken } from '~/server/utils/jwt'
import { error, success } from '#server/utils/response'
import { getCookie } from 'h3'

const FILE_CONFIG = {
    images: {
        types: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg'],
        maxSize: 10 * 1024 * 1024,
        directory: 'images'
    },
    videos: {
        types: ['video/mp4', 'video/webm', 'video/ogg', 'video/mov'],
        maxSize: 100 * 1024 * 1024,
        directory: 'videos'
    }
}

const getFileCategory = (fileType: string): 'images' | 'videos' | null => {
    if (FILE_CONFIG.images.types.includes(fileType)) return 'images'
    if (FILE_CONFIG.videos.types.includes(fileType)) return 'videos'
    return null
}

export default defineEventHandler(async (event) => {
    try {
        const token = getCookie(event, 'auth_token')
        if (!token) {
            return error('未登录', 401)
        }

        try {
            verifyToken(token)
        } catch (e) {
            return error('token 无效', 401)
        }

        const formData = await readMultipartFormData(event)
        if (!formData) {
            return error('未上传文件', 400)
        }

        const file = formData.find(item => item.name === 'file')
        if (!file || !file.data) {
            return error('文件格式错误', 400)
        }

        const fileType = file.type || ''
        const category = getFileCategory(fileType)

        if (!category) {
            return error('不支持的文件类型', 400)
        }

        const config = FILE_CONFIG[category]
        if (file.data.length > config.maxSize) {
            const sizeMB = (config.maxSize / (1024 * 1024)).toFixed(0)
            return error(`${category === 'images' ? '图片' : '视频'}文件不能超过${sizeMB}MB`, 400)
        }

        const fileExt = file.filename!.split('.').pop()?.toLowerCase() || ''
        const fileName = `${crypto.randomUUID()}.${fileExt}`

        const uploadDir = path.join(process.cwd(), 'public/uploads', config.directory)
        await fs.mkdir(uploadDir, { recursive: true })
        const filePath = path.join(uploadDir, fileName)

        await fs.writeFile(filePath, file.data)

        const fileUrl = `/uploads/${config.directory}/${fileName}`
        return success({
            url: fileUrl,
            name: file.filename,
            size: file.data.length,
            type: category,
            mimeType: fileType
        })
    } catch (err) {
        return error((err as Error).message, 500)
    }
})
