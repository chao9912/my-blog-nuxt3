<template>
  <section class="rounded-xl border border-slate-100 bg-white p-5 lg:p-6">
    <h2 class="text-base font-bold text-slate-900 lg:text-lg">个人信息</h2>

    <div class="mt-4 space-y-3.5 text-sm text-slate-700 lg:space-y-4 lg:text-base">
      <div class="flex items-start gap-3">
        <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs" :style="{ backgroundColor: 'var(--theme-color-100)', color: 'var(--theme-color-600)' }">
          👤
        </span>
        <div>
          <span class="text-slate-400">个人昵称：</span>
          <span class="font-medium">小辫子</span>
        </div>
      </div>
      <div class="flex items-start gap-3">
        <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs" :style="{ backgroundColor: 'var(--theme-color-100)', color: 'var(--theme-color-600)' }">
          👨
        </span>
        <div>
          <span class="text-slate-400">昵称：</span>
          <span>小辫子</span>
        </div>
      </div>
      <div class="flex items-start gap-3">
        <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs" :style="{ backgroundColor: 'var(--theme-color-100)', color: 'var(--theme-color-600)' }">
          👨
        </span>
        <div>
          <span class="text-slate-400">性别：</span>
          <span>男</span>
        </div>
      </div>
      <div class="flex items-start gap-3">
        <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs" :style="{ backgroundColor: 'var(--theme-color-100)', color: 'var(--theme-color-600)' }">
          💼
        </span>
        <div>
          <span class="text-slate-400">职业：</span>
          <span>产品经理</span>
        </div>
      </div>
      <div class="flex items-start gap-3">
        <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs" :style="{ backgroundColor: 'var(--theme-color-100)', color: 'var(--theme-color-600)' }">
          📍
        </span>
        <div>
          <span class="text-slate-400">所在地：</span>
          <span>上海</span>
        </div>
      </div>
      <div class="flex items-start gap-3">
        <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs" :style="{ backgroundColor: 'var(--theme-color-100)', color: 'var(--theme-color-600)' }">
          📧
        </span>
        <div>
          <span class="text-slate-400">邮箱：</span>
          <span class="break-all">xiaobianzi@example.com</span>
        </div>
      </div>
    </div>

    <button class="mt-5 h-10 w-full rounded-xl text-sm font-medium text-white shadow-sm lg:mt-6 lg:h-11 lg:text-base" :style="{ background: `linear-gradient(135deg, var(--theme-color-500), var(--theme-color-600))` }">
      编辑资料
    </button>
  </section>
</template>
