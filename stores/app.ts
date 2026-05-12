export const useAppStore = defineStore('app', {
    state: () => ({
        collapsed: false,

        loading: false
    }),

    actions: {
        toggleSidebar() {
            this.collapsed = !this.collapsed
        },

        setLoading(value: boolean) {
            this.loading = value
        }
    }
})