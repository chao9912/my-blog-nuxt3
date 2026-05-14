<template>
  <section
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5"
  >
    <article
        v-for="(item, index) in features"
        :key="item.title"
        class="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-slate-200 hover:shadow-xl"
    >
      <!-- 顶部渐变线 -->
      <div
          class="absolute inset-x-0 top-0 h-1 bg-gradient-to-r opacity-80"
          :class="item.line"
      />

      <!-- 背景淡色 -->
      <div
          class="absolute right-0 top-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full opacity-10 blur-2xl"
          :class="item.bgSoft"
      />

      <!-- 内容 -->
      <div class="relative z-10">
        <div class="flex items-center gap-3">
          <!-- 图标 -->
          <div
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl shadow-sm transition-all duration-300 group-hover:scale-105"
              :class="item.iconBg"
          >
            {{ item.icon }}
          </div>

          <!-- 文案 -->
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2">
              <h3
                  class="truncate text-[15px] font-bold tracking-tight text-slate-800"
              >
                {{ item.title }}
              </h3>

              <span
                  class="shrink-0 rounded-full bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-400"
              >
                0{{ index + 1 }}
              </span>
            </div>

            <p
                class="mt-0.5 truncate text-sm text-slate-500"
            >
              {{ item.desc }}
            </p>
          </div>
        </div>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
const features = [
  {
    title: '基础信息',
    desc: '了解我的个人简介与成长经历',
    icon: '👤',
    iconBg: 'bg-blue-50 text-blue-500',
    bgSoft: 'bg-blue-400',
    line: 'from-blue-400 to-cyan-400'
  },
  {
    title: '技能特长',
    desc: '掌握的前端技术栈与开发能力',
    icon: '⭐',
    iconBg: 'bg-violet-50 text-violet-500',
    bgSoft: 'bg-violet-400',
    line: 'from-violet-400 to-fuchsia-400'
  },
  {
    title: '职业经历',
    desc: '记录我的项目经验与工作履历',
    icon: '💼',
    iconBg: 'bg-emerald-50 text-emerald-500',
    bgSoft: 'bg-emerald-400',
    line: 'from-emerald-400 to-green-400'
  },
  {
    title: '教育经历',
    desc: '记录学习成长与校园经历',
    icon: '🎓',
    iconBg: 'bg-indigo-50 text-indigo-500',
    bgSoft: 'bg-indigo-400',
    line: 'from-indigo-400 to-blue-400'
  },
  {
    title: '联系方式',
    desc: '通过邮件与社交平台联系我',
    icon: '📞',
    iconBg: 'bg-orange-50 text-orange-500',
    bgSoft: 'bg-orange-400',
    line: 'from-orange-400 to-amber-400'
  }
]
</script>
