<script setup lang="ts">
import { ref } from 'vue'
import { NIcon } from 'naive-ui'
import { NotificationsOutline, SearchOutline, LogInOutline } from '@vicons/ionicons5'
import { useUserStore } from '~/stores/user'
import LoginModal from '~/components/LoginModal.vue'

const userStore = useUserStore()
const showLoginModal = ref(false)

const handleLoginClick = () => {
  showLoginModal.value = true
}

const handleCloseModal = () => {
  showLoginModal.value = false
}
</script>

<template>
  <header class="flex justify-end items-center gap-3">
    <!-- search -->
    <div
        class="w-[280px] h-[44px] bg-white rounded-full px-5 flex items-center shadow-sm border border-[#EEF2F6]"
    >
      <SearchOutline class="w-5 h-5 text-slate-400 mr-2" />
      <input
          type="text"
          placeholder="搜索内容..."
          class="flex-1 outline-none text-[14px] bg-transparent"
      />
    </div>

    <!-- notify -->
    <div
        class="w-[44px] h-[44px] rounded-full bg-white flex items-center justify-center shadow-sm border border-[#EEF2F6]"
    >
      <NotificationsOutline class="w-5 h-5" />
    </div>

    <!-- avatar -->
    <div v-if="userStore.isLogin" class="flex justify-end items-center gap-2">
      <div class="text-right">
        <p class="text-sm font-medium text-slate-700">{{ userStore.userInfo.nickname ||userStore.userInfo.username || '用户' }}</p>
        <p class="text-xs text-slate-400">已登录</p>
      </div>
      <img
          alt="头像"
          src="https://picsum.photos/100"
          class="w-[41px] h-[41px] rounded-full object-cover shadow-xl border border-white flex-shrink-0"
      />
    </div>

    <button v-else
            class="w-[80px] h-[40px] text-white rounded-full flex items-center justify-center gap-1 text-sm font-medium shadow-md hover:shadow-lg transition-all"
            :style="{ backgroundColor: 'var(--theme-color)' }"
            @click="handleLoginClick"
    >
      <LogInOutline class="w-4 h-4" />
      <span>登录</span>
    </button>

    <!-- Login Modal -->
    <LoginModal :visible="showLoginModal" @close="handleCloseModal" />
  </header>
</template>