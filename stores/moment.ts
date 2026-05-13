interface MomentItem {
    id: number
    title: string
    desc: string
    cover: string
    tag: string
    date: string
    likes: number
    comments: number
    views: number
    isVideo?: boolean
    duration?: string
}

interface MomentListResponse {
    list: MomentItem[]
    total: number
    page: number
    pageSize: number
    totalPages: number
}

export const useMomentStore = defineStore(
    'moment',
    {
        state: () => ({
            momentList: [] as MomentItem[],
            total: 0,
            page: 1,
            pageSize: 8,
            totalPages: 0,
            loading: false
        }),

        actions: {
            async fetchMomentList(page: number = 1) {
                this.loading = true
                try {
                    const response = await fetch(`/api/moment/list?page=${page}&pageSize=${this.pageSize}`)
                    const data = await response.json()
                    
                    if (data.code === 200) {
                        const result = data.data as MomentListResponse
                        this.momentList = result.list
                        this.total = result.total
                        this.page = result.page
                        this.totalPages = result.totalPages
                    }
                } catch (error) {
                    console.error('Failed to fetch moments:', error)
                } finally {
                    this.loading = false
                }
            },
            
            setPage(page: number) {
                if (page >= 1 && page <= this.totalPages) {
                    this.page = page
                    this.fetchMomentList(page)
                }
            },
            
            nextPage() {
                if (this.page < this.totalPages) {
                    this.setPage(this.page + 1)
                }
            },
            
            prevPage() {
                if (this.page > 1) {
                    this.setPage(this.page - 1)
                }
            }
        }
    }
)