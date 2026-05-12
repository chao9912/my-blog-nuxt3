export const useApi = () => {
    const getArticleList = (params?: any) => {
        return $fetch('/api/article/list', {
            params
        })
    }

    const getArticleDetail = (id: number) => {
        return $fetch('/api/article/detail', {
            params: {id}
        })
    }

    const createArticle = (data: any) => {
        return $fetch('/api/article/create', {
            method: 'POST',
            body: data
        })
    }

    const updateArticle = (data: any) => {
        return $fetch('/api/article/update', {
            method: 'PUT',
            body: data
        })
    }

    const deleteArticle = (id: number) => {
        return $fetch('/api/article/delete', {
            method: 'DELETE',
            params: {id}
        })
    }

    const getMomentList = () => {
        return $fetch('/api/moment/list')
    }
}