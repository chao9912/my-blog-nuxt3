import { useUserStore } from '~/stores/user'

interface ApiResponse<T = any> {
    code: number
    message: string
    data: T
}

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

interface UserInfo {
  id: number
  username: string
  email: string
  nickname: string
}

interface LoginResponse {
  token: string
  userInfo: UserInfo
}

const handleUnauthorized = () => {
    if (process.client) {
        const userStore = useUserStore()
        userStore.logout()
    }
}

export const useApi = () => {
    const { $apiFetch } = useNuxtApp()

    const getArticleList = async (params?: any) => {
        const response = await $apiFetch('/api/article/list', { params }) as ApiResponse
        if (response.code === 401) {
            handleUnauthorized()
            return null
        }
        return response
    }

    const getArticleDetail = async (id: number) => {
        const response = await $apiFetch('/api/article/detail', { params: {id} }) as ApiResponse
        if (response.code === 401) {
            handleUnauthorized()
            return null
        }
        return response
    }

    const createArticle = async (data: any) => {
        const response = await $apiFetch('/api/article/create', { method: 'POST', body: data }) as ApiResponse
        if (response.code === 401) {
            handleUnauthorized()
            return null
        }
        return response
    }

    const updateArticle = async (data: any) => {
        const response = await $apiFetch('/api/article/update', { method: 'PUT', body: data }) as ApiResponse
        if (response.code === 401) {
            handleUnauthorized()
            return null
        }
        return response
    }

    const deleteArticle = async (id: number) => {
        const response = await $apiFetch('/api/article/delete', { method: 'DELETE', params: {id} }) as ApiResponse
        if (response.code === 401) {
            handleUnauthorized()
            return null
        }
        return response
    }

    const getMomentList = async (page: number = 1, pageSize: number = 8, category: string|undefined = undefined): Promise<MomentListResponse> => {
        const response = await $apiFetch(`/api/moment/list`, {
            params:{page,pageSize,category:category!=='all'?category:undefined}
        }) as ApiResponse<MomentListResponse>
        
        if (response.code === 401) {
            handleUnauthorized()
            return {
                list: [],
                total: 0,
                page,
                pageSize,
                totalPages: 0
            }
        }
        
        if (response.code === 200 && response.data) {
            return response.data
        }
        
        return {
            list: [],
            total: 0,
            page,
            pageSize,
            totalPages: 0
        }
    }

    const login = async (email: string, password: string): Promise<LoginResponse | null> => {
        const response = await $apiFetch('/api/user/login', {
            method: 'POST',
            body: { email, password }
        }) as ApiResponse<LoginResponse>
        
        if (response.code === 401) {
            handleUnauthorized()
            return null
        }
        
        if (response.code === 200 && response.data) {
            return response.data
        }
        
        return null
    }

    const register = async (email: string, password: string, nickname: string): Promise<LoginResponse | null> => {
        const response = await $apiFetch('/api/user/register', {
            method: 'POST',
            body: { email, password, nickname }
        }) as ApiResponse<LoginResponse>
        
        if (response.code === 401) {
            handleUnauthorized()
            return null
        }
        
        if (response.code === 200 && response.data) {
            return response.data
        }
        
        return null
    }

    return {
        getArticleList,
        getArticleDetail,
        createArticle,
        updateArticle,
        deleteArticle,
        getMomentList,
        login,
        register
    }
}