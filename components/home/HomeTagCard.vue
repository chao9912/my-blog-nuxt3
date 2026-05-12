<template>
  <section class="rounded-[28px] border border-slate-100 bg-white p-6 lg:p-8">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h2 class="text-2xl font-bold text-slate-900 lg:text-3xl">个人标签</h2>

      <button class="h-11 rounded-2xl bg-blue-50 px-4 text-sm font-medium text-blue-600 transition hover:bg-blue-100">
        编辑标签
      </button>
    </div>

    <div class="mt-6 flex flex-wrap gap-3">
      <span
        v-for="tag in tags"
        :key="tag"
        class="rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-700 sm:text-base"
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
