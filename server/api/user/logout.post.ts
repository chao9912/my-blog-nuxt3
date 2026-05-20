import { success } from '~/server/utils/response'
import { deleteCookie } from 'h3'

export default defineEventHandler(async (event) => {
    deleteCookie(event, 'auth_token', {
        path: '/'
    })

    return success(null, '退出登录成功')
})