<template>
  <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
    <article
      v-for="(item, index) in features"
      :key="item.title"
      class="group relative overflow-hidden rounded-xl border border-slate-100 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg lg:p-5"
    >
      <div class="flex items-start gap-3">
        <div
          class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg text-white lg:h-12 lg:w-12 lg:text-xl"
          :class="item.bg"
        >
          {{ item.icon }}
        </div>

        <div class="min-w-0">
          <h3 class="text-sm font-bold text-slate-900 lg:text-base">
            {{ item.title }}
          </h3>

          <p class="mt-0.5 text-xs text-slate-400 lg:text-sm">
            {{ item.desc }}
          </p>
        </div>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
const features = [
  {
    title: '基础信息',
    desc: '了解我的基本情况',
    icon: '👤',
    bg: 'bg-blue-500'
  },
  {
    title: '技能特长',
    desc: '我的专业技能',
    icon: '⭐',
    bg: 'bg-violet-500'
  },
  {
    title: '职业经历',
    desc: '我的工作履历',
    icon: '💼',
    bg: 'bg-emerald-500'
  },
  {
    title: '联系方式',
    desc: '与我取得联系',
    icon: '📞',
    bg: 'bg-blue-500'
  },
  {
    title: '博客导航',
    desc: '快速访问内容',
    icon: '✈️',
    bg: 'bg-blue-600'
  }
]
</script>
