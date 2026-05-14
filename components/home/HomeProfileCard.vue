<template>
  <section
      class="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md lg:p-6"
  >
    <!-- 标题 -->
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
          class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-lg"
          :style="{ color: 'var(--theme-color-600)' }"
      >
        👋
      </div>
    </div>

    <!-- 信息列表 -->
    <div class="mt-5 space-y-3">
      <div
          v-for="item in infoList"
          :key="item.label"
          class="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 hover:bg-slate-50"
      >
        <!-- 图标 -->
        <span
            class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-sm transition-transform duration-200 group-hover:scale-105"
            :style="{
            backgroundColor: 'var(--theme-color-100)',
            color: 'var(--theme-color-600)'
          }"
        >
          {{ item.icon }}
        </span>

        <!-- 文本 -->
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
      </div>
    </div>

    <!-- 按钮 -->
<!--    <button-->
<!--        class="mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-xl text-sm font-medium text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md lg:mt-6 lg:h-11"-->
<!--        :style="{-->
<!--        background: `linear-gradient(135deg, var(&#45;&#45;theme-color-500), var(&#45;&#45;theme-color-600))`-->
<!--      }"-->
<!--    >-->
<!--      <span>编辑资料</span>-->

<!--      <svg-->
<!--          class="h-4 w-4"-->
<!--          fill="none"-->
<!--          stroke="currentColor"-->
<!--          stroke-width="2"-->
<!--          viewBox="0 0 24 24"-->
<!--      >-->
<!--        <path-->
<!--            stroke-linecap="round"-->
<!--            stroke-linejoin="round"-->
<!--            d="M11 5h2m-1-1v2m-7 9v4h4l9-9a2.121 2.121 0 00-3-3l-9 9z"-->
<!--        />-->
<!--      </svg>-->
<!--    </button>-->
  </section>
</template>

<script setup lang="ts">
const infoList = [
  {
    label: '个人昵称',
    value: '小辫子',
    icon: '👤'
  },
  {
    label: '昵称',
    value: '小辫子',
    icon: '✨'
  },
  {
    label: '职业',
    value: '前端开发工程师',
    icon: '💻'
  },
  {
    label: '所在地',
    value: '上海',
    icon: '📍'
  }
]
</script>
