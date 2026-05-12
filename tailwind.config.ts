export default {
    content: [
        './components/**/*.{vue,js,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './composables/**/*.{js,ts}',
        './app.vue'
    ],

    theme: {
        extend: {
            colors: {
                primary: '#287FFD',
                life: '#4CAF50',
                moment: '#22C7D6',
                work: '#FF8A00'
            }
        }
    },
    plugins: []
}