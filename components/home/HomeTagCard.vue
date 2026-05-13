<template>
  <section class="rounded-xl border border-slate-100 bg-white p-5 lg:p-6">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 class="text-base font-bold text-slate-900 lg:text-lg">个人标签</h2>

      <button class="h-8 rounded-lg px-3 text-xs font-medium lg:h-9 lg:text-sm transition-colors" :style="{ backgroundColor: 'var(--theme-color-50)', color: 'var(--theme-color-600)' }" style="hover:background-color: var(--theme-color-100);">
        编辑标签
      </button>
    </div>

    <div class="mt-4 flex flex-wrap gap-2">
      <span
        v-for="(tag, index) in tags"
        :key="tag"
        class="rounded-lg px-3 py-1.5 text-xs font-medium lg:text-sm transition-colors"
        :style="{ backgroundColor: 'var(--theme-color-50)', color: 'var(--theme-color-600)' }"
      >
        {{ tag }}
      </span>
    </div>
  </section>
</template>

<script setup lang="ts">
const tags = [
  '产品思维',
  '用户体验',
  '数据分析',
  '摄影爱好者',
  '阅读',
  '旅行',
  '持续学习',
  '记录生活'
]
</script>
