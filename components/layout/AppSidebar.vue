<template>
  <aside class="rounded-[28px] border border-slate-200/80 bg-white/95 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.06)] lg:p-6 lg:sticky lg:top-5 lg:h-[calc(100vh-2.5rem)] lg:flex lg:flex-col">
    <div class="flex items-center gap-4">
      <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500 text-xl font-bold text-white shadow-sm sm:h-14 sm:w-14">
        B
      </div>

      <div class="min-w-0">
        <h2 class="truncate text-xl font-bold text-slate-900 sm:text-2xl">博客空间</h2>
        <p class="mt-1 text-sm text-slate-500 sm:text-base">记录 · 分享 · 成长</p>
      </div>
    </div>

    <nav class="mt-6 flex gap-3 overflow-x-auto pb-1 lg:mt-10 lg:flex-1 lg:flex-col lg:overflow-visible">
      <NuxtLink
        v-for="item in menus"
        :key="item.path"
        :to="item.path"
        class="flex min-w-fit items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all sm:px-5 sm:text-base lg:w-full lg:px-5 lg:py-4"
        :class="route.path === item.path
          ? 'bg-blue-50 text-blue-600'
          : 'text-slate-700 hover:bg-slate-100'"
      >
        <span class="text-lg">{{ item.icon }}</span>
        <span class="whitespace-nowrap">{{ item.title }}</span>
      </NuxtLink>
    </nav>

    <div class="mt-5 lg:mt-auto lg:pt-8">
      <button class="h-12 w-full rounded-2xl bg-slate-100 text-sm font-medium text-slate-700 transition hover:bg-slate-200 sm:h-14 sm:text-base">
        设置
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
const route = useRoute()

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
</script>
