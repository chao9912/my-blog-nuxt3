import { defineEventHandler, readMultipartFormData, createError } from 'h3'
import crypto from 'crypto'
import { verifyToken } from '~/server/utils/jwt'
import { error, success } from '#server/utils/response'
import { getCookie } from 'h3'
import { useServerSupabase } from '~/server/utils/supabase'

const FILE_CONFIG = {
    images: {
        types: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg'],
        maxSize: 10 * 1024 * 1024,
        directory: 'images'
    },
    videos: {
        types: ['video/mp4', 'video/webm', 'video/ogg', 'video/mov'],
        maxSize: 50 * 1024 * 1024,
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

        const supabase = useServerSupabase()
        
        if (!supabase) {
            return error('Supabase 客户端初始化失败', 500)
        }

        const fileExt = file.filename!.split('.').pop()?.toLowerCase() || ''
        const fileName = `${crypto.randomUUID()}.${fileExt}`
        const storagePath = `public/${config.directory}/${fileName}`

        try {
            const { error: uploadError } = await supabase.storage.from('uploads').upload(storagePath, file.data, {
                contentType: fileType,
            })

            if (uploadError) {
                console.error('Supabase upload error:', uploadError)
                return error('文件上传失败: ' + uploadError.message, 500)
            }
        } catch (err) {
            console.error('Supabase fetch error:', err)
            return error('文件上传失败: ' + (err as Error).message, 500)
        }

        const { data: { publicUrl } } = supabase.storage.from('uploads').getPublicUrl(storagePath)
        const fileUrl = publicUrl
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
