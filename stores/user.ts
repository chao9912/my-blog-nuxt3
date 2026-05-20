interface UserInfo {
    id?: number
    username?: string
    email?: string
    nickname?: string
}

export const useUserStore = defineStore(
    'user',
    {
        state: () => ({
            token: '',
            userInfo: {} as UserInfo
        }),

        getters: {
            isLogin: (state) => !!state.token
        },

        actions: {
            setToken(token: string) {
                this.token = token
            },

            setUserInfo(userInfo: UserInfo) {
                this.userInfo = userInfo
            },

            login(token: string, userInfo: UserInfo) {
                this.token = token
                this.userInfo = userInfo
            },

            logout() {
                this.token = ''
                this.userInfo = {}
            }
        },

        persist: true
    }
)