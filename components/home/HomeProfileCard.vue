<template>
  <section
      class="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg lg:p-6"
  >
    <div class="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-5" :style="{ backgroundColor: 'var(--theme-color-500)' }"></div>
    <div class="absolute -right-4 -bottom-4 h-24 w-24 rounded-full opacity-5" :style="{ backgroundColor: 'var(--theme-color-400)' }"></div>

    <div class="relative z-10">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-lg font-bold text-slate-900">
            个人信息
          </h2>

          <p class="mt-1 text-sm text-slate-400">
            About Me
          </p>
        </div>

        <div
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br transition-transform duration-300 hover:scale-105"
            :style="{
            background: `linear-gradient(135deg, var(--theme-color-100), var(--theme-color-200))`,
            color: 'var(--theme-color-600)'
          }"
        >
          👋
        </div>
      </div>

      <div class="mt-5 space-y-3">
        <div
            v-for="(item, index) in infoList"
            :key="item.label"
            class="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 hover:bg-slate-50"
            :style="{ animationDelay: `${100 + index * 50}ms` }"
        >
          <span
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm transition-all duration-200 group-hover:scale-105 group-hover:shadow-sm"
              :style="{
              backgroundColor: 'var(--theme-color-100)',
              color: 'var(--theme-color-600)'
            }"
          >
            {{ item.icon }}
          </span>

          <div class="min-w-0 flex-1">
            <p class="text-xs text-slate-400">
              {{ item.label }}
            </p>

            <p
                class="mt-0.5 break-all text-sm font-medium text-slate-700 lg:text-[15px]"
            >
              {{ item.value }}
            </p>
          </div>

          <!-- <svg
              class="h-4 w-4 shrink-0 text-slate-300 transition-colors duration-200 group-hover:text-slate-400"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg> -->
        </div>

        <div
            class="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 cursor-pointer hover:bg-slate-50"
            @click="handleResumeClick"
        >
          <span
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm transition-all duration-200 group-hover:scale-105 group-hover:shadow-sm"
              :style="{
              backgroundColor: 'var(--theme-color-100)',
              color: 'var(--theme-color-600)'
            }"
          >
            📄
          </span>

          <div class="min-w-0 flex-1">
            <p class="text-xs text-slate-400">
              个人简历
            </p>

            <p
                class="mt-0.5 break-all text-sm font-medium text-slate-700 lg:text-[15px]"
            >
              查看简历附件
            </p>
          </div>

          <svg
              class="h-4 w-4 shrink-0 text-slate-300 transition-all duration-200 group-hover:text-slate-400"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const handleResumeClick = () => {
  alert('简历功能开发中，敬请期待！')
}

const infoList = [
  {
    label: '昵称',
    value: '小辫子',
    icon: '👤'
  },
  {
    label: '职业',
    value: '前端开发工程师',
    icon: '💻'
  },
  {
    label: '邮箱',
    value: 'example@example.com',
    icon: '✨'
  },
  {
    label: '所在地',
    value: '上海',
    icon: '📍'
  }
]
</script>
