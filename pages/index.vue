<template>
  <div class="home-container">
    <div v-if="loading" class="min-h-screen flex items-center justify-center">
      <div class="flex flex-col items-center gap-3">
        <div class="w-10 h-10 border-4 border-slate-200 border-t-theme-color rounded-full animate-spin"></div>
        <p class="text-slate-500">加载中...</p>
      </div>
    </div>

    <template v-else-if="!userData">
      <div class="min-h-screen flex items-center justify-center p-5">
        <div class="w-full max-w-md text-center">
          <div class="inline-flex h-20 w-20 items-center justify-center rounded-full mb-6" :style="{ backgroundColor: 'var(--theme-color-100)' }">
            <span class="text-4xl">👤</span>
          </div>
          <h2 class="text-2xl font-bold text-slate-800 mb-3">欢迎来到博客空间</h2>
          <p class="text-slate-500 mb-8">请先登录以查看完整内容</p>
          <button 
            class="w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 hover:shadow-lg"
            :style="{ 
              background: `linear-gradient(135deg, var(--theme-color-400), var(--theme-color-600))`,
              color: 'white'
            }"
            @click="showLogin = true"
          >
            立即登录
          </button>
          <p class="mt-4 text-sm text-slate-400">
            还没有账号？登录页面可以直接注册
          </p>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="animate-slide-up animation-delay-200">
        <HomeBanner />
      </div>

      <div class="mt-5 lg:mt-6 px-5">
        <div class="grid grid-cols-1 gap-5 xl:grid-cols-[380px_minmax(0,1fr)] lg:gap-6">
          <div class="animate-slide-up animation-delay-300">
            <HomeProfileCard :user="userData" />
          </div>
          <div class="space-y-5 lg:space-y-6">
            <div class="animate-slide-up animation-delay-400">
              <HomeIntroCard :user="userData" />
            </div>
            <div class="animate-slide-up animation-delay-500">
              <HomeTagCard :user="userData" />
            </div>
          </div>
        </div>
      </div>
    </template>

    <LoginModal :visible="showLogin" @close="handleLoginClose" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {useUserStore} from "~/stores/user";

const showLogin = ref(false)

interface UserInfo {
  id?: number
  username?: string
  email?: string
  nickname?: string
  resume?: string
  occupation?: string
  avatar?: string
  bio?: string
  location?: string
  tags?: string | string[]
}

const { data: userData, pending: loading } = useAsyncData('userInfo', async () => {
  try {
    const headers: Record<string, string> = {}
    
    if (process.server) {
      const event = useRequestEvent()
      const cookie = event?.headers.get('cookie')
      if (cookie) {
        headers.cookie = cookie
      }
    }

    const response = await $fetch('/api/user/info', {
      credentials: 'include',
      headers
    }) as { code: number; data: UserInfo }

    if (response.code === 200) {
      return response.data
    }
  } catch (error) {
    if (process.client) {
      const userStore = useUserStore()
      userStore.logout()
    }
    console.error('Failed to fetch user info:', error)
  }
  return null
})

const handleLoginClose = () => {
  showLogin.value = false
  navigateTo('/')
}
</script>
