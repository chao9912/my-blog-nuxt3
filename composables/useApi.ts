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
  category: string
  mediaUrls: string
  createTime: string
}

interface MomentListResponse {
  list: MomentItem[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

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

    const getMomentList = async (page: number = 1, pageSize: number = 8, category: string|undefined = undefined): Promise<MomentListResponse> => {
        const response = await $fetch(`/api/moment/list`,{
            params:{page,pageSize,category:category!=='all'?category:undefined}
        })
        const data = response as { code: number; data: MomentListResponse; message: string }
        
        if (data.code === 200 && data.data) {
            return data.data
        }
        
        return {
            list: [],
            total: 0,
            page,
            pageSize,
            totalPages: 0
        }
    }

    return {
        getArticleList,
        getArticleDetail,
        createArticle,
        updateArticle,
        deleteArticle,
        getMomentList
    }
}
