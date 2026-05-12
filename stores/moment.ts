interface MomentItem {
    id: number

    content: string

    images: string[]

    createTime?: string
}

export const useMomentStore = defineStore(
    'moment',
    {
        state: () => ({
            momentList: [] as MomentItem[]
        }),

        actions: {
            setMomentList(list: MomentItem[]) {
                this.momentList = list
            }
        }
    }
)