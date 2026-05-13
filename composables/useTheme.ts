export const themeMap: Record<string, string> = {
    '/': '#3373EF',
    '/moments': '#13ABB9',
    '/diary': '#42AD60',
    '/work': '#FD7501'
}

export const useTheme = () => {
    const route = useRoute()

    const currentTheme = computed(() => {
        return themeMap[route.path] || '#1883F5'
    })

    const setTheme = (color: string) => {
        if (!import.meta.client) return

        document.documentElement.style.setProperty(
            '--theme-color',
            color
        )
    }

    watch(
        currentTheme,
        (color) => {
            setTheme(color)
        },
        {
            immediate: true
        }
    )

    return {
        currentTheme
    }
}
