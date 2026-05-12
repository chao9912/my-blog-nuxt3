interface ArticleItem {
    id: number

    title: string

    desc?: string

    cover?: string

    content?: string

    createTime?: string
}

export const useArticleStore = defineStore(
    'article',
    {
        state: () => ({
            articleList: [] as ArticleItem[],

            currentArticle:
                null as ArticleItem | null
        }),

        actions: {
            setArticleList(list: ArticleItem[]) {
                this.articleList = list
            },

            setCurrentArticle(
                article: ArticleItem
            ) {
                this.currentArticle = article
            }
        }
    }
)