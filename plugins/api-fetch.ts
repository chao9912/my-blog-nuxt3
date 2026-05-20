import { useUserStore } from '~/stores/user'

export default defineNuxtPlugin(() => {
    const apiFetch = $fetch.create({
        onRequest({ options }: { options: any }) {
            if (process.client) {
                const userStore = useUserStore()
                const token = userStore.token
                if (token) {
                    options.headers = options.headers || new Headers()
                    if (options.headers instanceof Headers) {
                        options.headers.set('Authorization', `Bearer ${token}`)
                    } else {
                        options.headers['Authorization'] = `Bearer ${token}`
                    }
                }
            }
        },

        onResponseError({ response }: { response: any }) {
            if (process.client && response.status === 401) {
                const userStore = useUserStore()
                userStore.logout()
            }
        }
    })

    return {
        provide: {
            apiFetch
        }
    }
})
