<template>
  <section class="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md lg:p-8">
    <div class="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br opacity-5 rounded-full" :style="{ background: `linear-gradient(135deg, var(--theme-color-200), var(--theme-color-400))` }"></div>
    
    <div class="relative z-10">
      <div class="flex items-center justify-between mb-5">
        <div class="flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br transition-transform duration-300" :style="{ background: `linear-gradient(135deg, var(--theme-color-100), var(--theme-color-200))`, color: 'var(--theme-color-600)' }">
            🏷️
          </div>
          <div>
            <h2 class="text-lg font-bold text-slate-900">个人标签</h2>
            <p class="text-xs text-slate-400">Tags</p>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap gap-2.5">
        <span
          v-for="(tag, index) in displayTags"
          :key="tag"
          class="group relative flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
          :style="{ backgroundColor: 'var(--theme-color-50)', color: 'var(--theme-color-600)' }"
        >
          <span class="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-200 group-hover:opacity-100" :style="{ background: `linear-gradient(135deg, var(--theme-color-100), var(--theme-color-200))` }"></span>
          <span class="relative z-10">{{ tag }}</span>
          <svg class="relative z-10 h-3.5 w-3.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface UserInfo {
  tags?: string | string[]
}

const props = defineProps<{
  user?: UserInfo | null
}>()

const defaultTags = [
  '产品思维',
  '用户体验',
  '数据分析',
  '摄影爱好者',
  '阅读',
  '旅行',
  '持续学习',
  '记录生活'
]

const displayTags = computed(() => {
  const userTags = props.user?.tags
  
  if (!userTags) {
    return defaultTags
  }
  
  if (Array.isArray(userTags)) {
    return userTags.length > 0 ? userTags : defaultTags
  }
  
  if (typeof userTags === 'string') {
    const parsedTags = userTags.split(',').map(tag => tag.trim()).filter(tag => tag)
    return parsedTags.length > 0 ? parsedTags : defaultTags
  }
  
  return defaultTags
})
</script>
