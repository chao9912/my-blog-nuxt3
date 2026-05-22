<template>
  <aside class="rounded-[12px] border border-slate-200/80 bg-white/95 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.06)] lg:p-6 lg:sticky lg:top-5 lg:h-[calc(100vh-2.5rem)] lg:flex lg:flex-col">
    <!-- Logo 区域 -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="flex h-11 w-11 items-center justify-center rounded-xl text-lg font-bold text-white shadow-md" :style="{ background: `linear-gradient(135deg, var(--theme-color-400), var(--theme-color-600))` }">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </div>

        <div class="min-w-0">
          <h2 class="truncate text-base font-bold text-slate-900 sm:text-lg">个人博客</h2>
          <p class="mt-0.5 text-xs text-slate-500 sm:text-sm">记录 · 分享 · 成长</p>
        </div>
      </div>

      <!-- 移动端下拉菜单按钮 -->
      <button 
        class="lg:hidden flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all duration-300"
        @click="isMenuOpen = !isMenuOpen"
      >
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2" 
          class="w-5 h-5 transition-transform duration-300"
          :class="{ 'rotate-90': isMenuOpen }"
        >
          <path v-if="!isMenuOpen" d="M4 6h16M4 12h16M4 18h16"/>
          <path v-else d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- 移动端下拉菜单内容 -->
    <Transition name="slide">
      <div 
        v-show="isMenuOpen"
        class="lg:hidden mt-4 pb-4 border-t border-slate-100 pt-4"
      >
        <nav class="flex flex-col gap-1">
          <NuxtLink
            v-for="(item, index) in menus"
            :key="item.path"
            :to="item.path"
            class="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all"
            :class="route.path === item.path
              ? 'border'
              : 'text-slate-700 hover:bg-slate-100'"
            :style="route.path === item.path ? { backgroundColor: 'var(--theme-color-50)', color: 'var(--theme-color-600)', borderColor: 'var(--theme-color-200)' } : {}"
            @click="isMenuOpen = false"
          >
            <span class="flex h-7 w-7 items-center justify-center rounded-lg" :style="{ backgroundColor: route.path === item.path ? 'var(--theme-color-100)' : 'var(--theme-color-100)', color: 'var(--theme-color-600)' }">
              <span class="text-sm">{{ item.icon }}</span>
            </span>
            <span>{{ item.title }}</span>
          </NuxtLink>
        </nav>
        
        <!-- 移动端用户信息和操作 -->
        <div class="mt-4 pt-4 border-t border-slate-100">
          <div v-if="userStore.isLogin" class="space-y-3">
            <div class="flex items-center gap-3 px-4">
              <img 
                :src="userStore.userInfo.avatar || 'https://picsum.photos/48'" 
                :alt="userStore.userInfo.nickname"
                class="h-10 w-10 rounded-full object-cover bg-slate-100"
              />
              <div class="min-w-0">
                <p class="text-sm font-medium text-slate-900 truncate">{{ userStore.userInfo.nickname || userStore.userInfo.email }}</p>
                <p class="text-xs text-slate-500">{{ userStore.userInfo.email }}</p>
              </div>
            </div>
            <button 
              class="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
              @click="handleLogout"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              <span>退出登录</span>
            </button>
          </div>
          <button 
            v-else 
            class="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
            @click="handleLoginClick"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4">
              <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9"/>
            </svg>
            <span>登录</span>
          </button>
        </div>
      </div>
    </Transition>

    <!-- 大屏完整导航菜单 -->
    <nav class="hidden lg:mt-8 lg:flex lg:flex-1 lg:flex-col lg:gap-2">
      <NuxtLink
        v-for="item in menus"
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all"
        :class="route.path === item.path
          ? 'border'
          : 'text-slate-700 hover:bg-slate-100'"
        :style="route.path === item.path ? { backgroundColor: 'var(--theme-color-50)', color: 'var(--theme-color-600)', borderColor: 'var(--theme-color-200)' } : {}"
      >
        <span class="flex h-7 w-7 items-center justify-center rounded-lg" :style="{ backgroundColor: route.path === item.path ? 'var(--theme-color-100)' : 'var(--theme-color-100)', color: 'var(--theme-color-600)' }">
          <span class="text-sm">{{ item.icon }}</span>
        </span>
        <span class="whitespace-nowrap">{{ item.title }}</span>
      </NuxtLink>
    </nav>

    <!-- 大屏设置按钮 -->
    <div class="hidden lg:mt-auto lg:pt-6">
      <button class="flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-medium transition" style="background-color: var(--theme-color-100); color: var(--theme-color-600);">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4">
          <path d="M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
        <span>设置</span>
      </button>
    </div>
  </aside>

  <!-- Login Modal -->
  <LoginModal :visible="showLoginModal" @close="handleCloseModal" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '~/stores/user'
import { useApi } from '~/composables/useApi'
import LoginModal from '~/components/LoginModal.vue'

const route = useRoute()
const isMenuOpen = ref(false)
const showLoginModal = ref(false)
const userStore = useUserStore()

const menus = [
  {
    title: '首页（个人简介）',
    path: '/',
    icon: '🏠'
  },
  {
    title: '小辫子（精彩瞬间）',
    path: '/moments',
    icon: '📷'
  },
  {
    title: '温柔乡（生活记录）',
    path: '/diary',
    icon: '📝'
  },
  {
    title: '战场（工作记录）',
    path: '/work',
    icon: '💼'
  }
]

const handleLoginClick = () => {
  isMenuOpen.value = false
  showLoginModal.value = true
}

const handleCloseModal = () => {
  showLoginModal.value = false
}

const handleLogout = async () => {
  const { logout } = useApi()
  await logout()
  isMenuOpen.value = false
  window.location.reload()
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-out;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
