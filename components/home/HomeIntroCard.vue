<template>
  <section class="relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md lg:p-8">
    <div class="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br opacity-5 rounded-full -translate-y-1/2 translate-x-1/2" :style="{ background: `linear-gradient(135deg, var(--theme-color-200), var(--theme-color-400))` }"></div>
    
    <div class="relative z-10">
      <div class="flex items-center gap-3 mb-5">
        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br transition-transform duration-300" :style="{ background: `linear-gradient(135deg, var(--theme-color-100), var(--theme-color-200))`, color: 'var(--theme-color-600)' }">
          ✨
        </div>
        <div>
          <h2 class="text-lg font-bold text-slate-900">个人简介</h2>
          <p class="text-xs text-slate-400">Personal Introduction</p>
        </div>
      </div>

      <div class="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_180px]">
        <div class="space-y-4 text-sm leading-relaxed text-slate-600 lg:text-base">
          <p>
            热爱产品设计与用户体验，专注于用户需求和产品解决实际问题。
          </p>
          <p>
            喜欢记录生活中的点滴，分享所思所想，期待与更多有趣的人相遇。
          </p>
        </div>

        <div class="relative flex items-center justify-center">
          <div class="absolute -inset-3 rounded-2xl opacity-20 blur-xl" :style="{ background: `linear-gradient(135deg, var(--theme-color-200), var(--theme-color-300))` }"></div>
          <svg class="relative w-full max-w-[120px] h-auto transition-transform duration-300 hover:scale-105" viewBox="0 0 120 140" fill="none">
            <rect x="20" y="70" width="20" height="55" rx="2" :style="{ fill: 'var(--theme-color-50)' }" />
            <rect x="23" y="75" width="14" height="3" rx="1" :style="{ fill: 'var(--theme-color-300)' }" />
            <rect x="23" y="82" width="12" height="2" rx="1" :style="{ fill: 'var(--theme-color-200)' }" />
            <rect x="23" y="87" width="10" height="2" rx="1" :style="{ fill: 'var(--theme-color-200)' }" />
            
            <rect x="48" y="50" width="28" height="75" rx="3" :style="{ fill: 'var(--theme-color-100)' }" />
            <rect x="51" y="55" width="22" height="4" rx="2" :style="{ fill: 'var(--theme-color-400)' }" />
            <rect x="51" y="63" width="18" height="3" rx="1" :style="{ fill: 'var(--theme-color-200)' }" />
            <rect x="51" y="70" width="20" height="3" rx="1" :style="{ fill: 'var(--theme-color-200)' }" />
            <rect x="51" y="77" width="16" height="3" rx="1" :style="{ fill: 'var(--theme-color-200)' }" />
            
            <rect x="82" y="60" width="22" height="65" rx="3" :style="{ fill: 'var(--theme-color-50)' }" />
            <rect x="85" y="65" width="16" height="4" rx="2" :style="{ fill: 'var(--theme-color-400)' }" />
            <rect x="85" y="73" width="14" height="2" rx="1" :style="{ fill: 'var(--theme-color-200)' }" />
            <rect x="85" y="79" width="12" height="2" rx="1" :style="{ fill: 'var(--theme-color-200)' }" />
            
            <ellipse cx="62" cy="35" rx="20" ry="18" :style="{ fill: 'var(--theme-color-50)' }" />
            <path d="M52 30 Q62 42 72 30" stroke="var(--theme-color-400)" stroke-width="2" fill="none" stroke-linecap="round"/>
            <ellipse cx="56" cy="28" rx="2" ry="2.5" :style="{ fill: 'var(--theme-color-300)' }" />
            <ellipse cx="68" cy="28" rx="2" ry="2.5" :style="{ fill: 'var(--theme-color-300)' }" />
            <path d="M54 38 L58 42 L66 42 L70 38" stroke="var(--theme-color-400)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>
