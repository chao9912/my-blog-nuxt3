<script setup lang="ts">
import { NIcon } from 'naive-ui'
import { NotificationsOutline, SearchOutline } from '@vicons/ionicons5'
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
    <img
        alt="头像"
        src="https://picsum.photos/100"
        class="w-[41px] h-[41px] rounded-full object-cover  shadow-xl border border-white"
    />
  </header>
</template>