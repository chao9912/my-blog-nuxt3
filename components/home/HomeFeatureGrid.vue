<template>
  <section class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
    <article
      v-for="item in features"
      :key="item.title"
      class="rounded-[24px] border border-slate-100 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg lg:p-6"
    >
      <div
        class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl text-white lg:h-16 lg:w-16"
        :class="item.bg"
      >
        {{ item.icon }}
      </div>

      <h3 class="text-xl font-bold text-slate-900 lg:text-2xl">
        {{ item.title }}
      </h3>

      <p class="mt-2 text-sm text-slate-400 lg:text-base">
        {{ item.desc }}
      </p>
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
    bg: 'bg-sky-500'
  },
  {
    title: '博客导航',
    desc: '快速访问内容',
    icon: '✈️',
    bg: 'bg-blue-600'
  }
]
</script>
