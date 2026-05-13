<template>
  <aside class="rounded-[12px] border border-slate-200/80 bg-white/95 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.06)] lg:p-6 lg:sticky lg:top-5 lg:h-[calc(100vh-2.5rem)] lg:flex lg:flex-col">
    <div class="flex items-center gap-3">
      <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 text-lg font-bold text-white shadow-md">
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

    <nav class="mt-6 flex gap-2 overflow-x-auto pb-1 lg:mt-8 lg:flex-1 lg:flex-col lg:overflow-visible">
      <NuxtLink
        v-for="item in menus"
        :key="item.path"
        :to="item.path"
        class="flex min-w-fit items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all lg:w-full lg:px-4 lg:py-3"
        :class="route.path === item.path
          ? 'bg-blue-50 text-blue-600 border border-blue-200'
          : 'text-slate-700 hover:bg-slate-100'"
      >
        <span class="flex h-7 w-7 items-center justify-center rounded-lg" :class="route.path === item.path ? 'bg-blue-500/10' : 'bg-slate-100'">
          <span class="text-sm">{{ item.icon }}</span>
        </span>
        <span class="whitespace-nowrap">{{ item.title }}</span>
      </NuxtLink>
    </nav>

    <div class="mt-5 lg:mt-auto lg:pt-6">
      <button class="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-100 text-sm font-medium text-slate-700 transition hover:bg-slate-200">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4">
          <path d="M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
        <span>设置</span>
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
