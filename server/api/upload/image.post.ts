export default defineEventHandler(async () => {
    return {
        code: 200,
        data: {
            url: 'https://picsum.photos/300/300'
        }
    }
})