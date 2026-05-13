<script setup lang="ts">
import { NIcon } from 'naive-ui'
import { NotificationsOutline } from '@vicons/ionicons5'
</script>

<template>
  <header class="flex justify-end items-center gap-5">
    <!-- search -->
    <div
        class="w-[320px] h-[56px] bg-white rounded-full px-6 flex items-center shadow-sm border border-[#EEF2F6]"
    >
      <input
          type="text"
          placeholder="搜索内容..."
          class="flex-1 outline-none text-[15px] bg-transparent"
      />
    </div>

    <!-- notify -->
    <div
        class="w-[56px] h-[56px] rounded-full bg-white flex items-center justify-center shadow-sm border border-[#EEF2F6]"
    >
      <NotificationsOutline class="w-6 h-6" />
    </div>

    <!-- avatar -->
    <img
        alt="头像"
        src="https://i.pravatar.cc/100"
        class="w-[56px] h-[56px] rounded-full object-cover"
    />
  </header>
</template>