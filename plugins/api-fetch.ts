import { useUserStore } from '~/stores/user'

export default defineNuxtPlugin(() => {
    const apiFetch = $fetch.create({
        onResponseError({ response }: { response: any }) {
            if (process.client) {
                const message = useMessage()
                const errorMessage = response._data?.message || response.statusText || '请求失败'
                message.error(errorMessage)
                
                if (response.status === 401) {
                    const userStore = useUserStore()
                    userStore.logout()
                }
            }
        },
        onResponse({ response }: { response: any }) {
            if (process.client && response._data && response._data.code !== 200) {
                const message = useMessage()
                message.error(response._data.message || '操作失败')
            }
        }
    })

    return {
        provide: {
            apiFetch
        }
    }
})