interface UserInfo {
    id?: number
    username?: string
    email?: string
    nickname?: string
    resume?: string
    occupation?: string
    avatar?: string
    bio?: string
    location?: string
    tags?: string | string[]
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
            },

            async refreshUserInfo() {
                if (this.token && Object.keys(this.userInfo).length === 0) {
                    const { getUserInfo } = useApi()
                    const userInfo = await getUserInfo()
                    if (userInfo) {
                        this.userInfo = userInfo
                    }
                }
            }
        },

        persist: true
    }
)