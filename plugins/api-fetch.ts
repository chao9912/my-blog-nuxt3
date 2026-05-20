import { useUserStore } from '~/stores/user'

export default defineNuxtPlugin(() => {
    const apiFetch = $fetch.create({
        onResponseError({ response }: { response: any }) {
            console.log(response);
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
