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

export async function fetchMomentList(page: number = 1, pageSize: number = 8, category: string = 'all'): Promise<MomentListResponse> {
  let url = `/api/moment/list?page=${page}&pageSize=${pageSize}`
  if (category && category !== 'all') {
    url += `&category=${category}`
  }
  
  const response = await $fetch(url)
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
