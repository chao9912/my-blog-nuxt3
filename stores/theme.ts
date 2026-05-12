export const useThemeStore = defineStore(
    'theme',
    {
        state: () => ({
            darkMode: false,

            primaryColor: '#287FFD'
        }),

        actions: {
            toggleTheme() {
                this.darkMode = !this.darkMode
            },

            setPrimaryColor(color: string) {
                this.primaryColor = color
            }
        },

        persist: true
    }
)