<script setup lang="ts">
import { ref, h } from 'vue'
import { NIcon } from 'naive-ui'
import { NotificationsOutline, SearchOutline, LogInOutline, LogOutOutline, PersonOutline } from '@vicons/ionicons5'
import { useUserStore } from '~/stores/user'
import { useApi } from '~/composables/useApi'
import { useRouter } from 'vue-router'
import LoginModal from '~/components/LoginModal.vue'

const userStore = useUserStore()
const router = useRouter()
const showLoginModal = ref(false)

const dropdownOptions = [
  { 
    label: '个人中心', 
    key: 'profile', 
    icon: () => h(NIcon, null, { default: () => h(PersonOutline, { class: 'w-4 h-4' }) })
  },
  { 
    label: '退出登录', 
    key: 'logout', 
    icon: () => h(NIcon, null, { default: () => h(LogOutOutline, { class: 'w-4 h-4' }) })
  }
]

const handleLoginClick = () => {
  showLoginModal.value = true
}

const handleCloseModal = () => {
  showLoginModal.value = false
}

const handleSelect = async (e:string) => {
  if (e === 'logout') {
    const { logout } = useApi()
    await logout()
    window.location.reload()
  } else if (e === 'profile') {
    router.push('/profile')
  }
}
</script>

<style scoped>
:deep(.n-dropdown) {
  border-radius: 12px !important;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12) !important;
  padding: 8px !important;
  border: 1px solid rgba(0, 0, 0, 0.06) !important;
}

:deep(.n-dropdown-option) {
  border-radius: 8px !important;
  padding: 10px 16px !important;
  margin: 2px 0 !important;
  transition: all 0.2s ease !important;
}

:deep(.n-dropdown-option:hover) {
  background-color: rgba(51, 115, 239, 0.08) !important;
  color: var(--theme-color) !important;
}

:deep(.n-dropdown-option-body__prefix) {
  margin-right: 10px !important;
}
</style>

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
    <n-dropdown
        v-if="userStore.isLogin"
        placement="bottom-end"
        trigger="hover"
        :size="'medium'"
        :options="dropdownOptions"
        @select="handleSelect"
    >
    <div class="flex justify-end items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity">
      <div class="text-right">
        <p class="text-sm font-medium text-slate-700">{{ userStore.userInfo.nickname ||userStore.userInfo.username || '用户' }}</p>
        <p class="text-xs text-slate-400">已登录</p>
      </div>
      <img
          alt="头像"
          src="https://picsum.photos/100"
          class="w-[41px] h-[41px] rounded-full object-cover shadow-xl border-2 border-white flex-shrink-0"
      />
    </div>
    </n-dropdown>

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