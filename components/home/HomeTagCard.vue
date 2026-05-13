<template>
  <section class="rounded-xl border border-slate-100 bg-white p-5 lg:p-6">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 class="text-base font-bold text-slate-900 lg:text-lg">个人标签</h2>

      <button class="h-8 rounded-lg bg-blue-50 px-3 text-xs font-medium text-blue-600 hover:bg-blue-100 lg:h-9 lg:text-sm">
        编辑标签
      </button>
    </div>

    <div class="mt-4 flex flex-wrap gap-2">
      <span
        v-for="(tag, index) in tags"
        :key="tag"
        class="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 lg:text-sm"
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

const tagColors = [
  'bg-blue-50 text-blue-600',
  'bg-violet-50 text-violet-600',
  'bg-emerald-50 text-emerald-600',
  'bg-sky-50 text-sky-600',
  'bg-orange-50 text-orange-600',
  'bg-pink-50 text-pink-600',
  'bg-red-50 text-red-600',
  'bg-teal-50 text-teal-600'
]

const tagGlows = [
  'bg-blue-500/10',
  'bg-violet-500/10',
  'bg-emerald-500/10',
  'bg-sky-500/10',
  'bg-orange-500/10',
  'bg-pink-500/10',
  'bg-red-500/10',
  'bg-teal-500/10'
]
</script>
