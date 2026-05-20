export const themeMap: Array<{ pattern: string; color: string }> = [
    { pattern: '/moments', color: '#13ABB9' },
    { pattern: '/diary', color: '#42AD60' },
    { pattern: '/work', color: '#FD7501' }
]

export const useTheme = () => {
    const route = useRoute()

    const currentTheme = computed(() => {
        const matchedTheme = themeMap.find(item => route.path.includes(item.pattern))
        return matchedTheme?.color || '#3373EF'
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