<script setup lang="ts">
</script>
<template>
  <section class="banner-cu relative overflow-hidden bg-gradient-to-br from-[#E5F0FF] via-[#E8F3FF] to-[#F0F7FF] px-6 pb-8 pt-[84px] lg:px-10 lg:pb-12 lg:pt-[84px]">
    <div class="absolute inset-0 z-0 overflow-hidden">
      <svg class="absolute -bottom-8 left-0 w-full" viewBox="0 0 1440 200" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,120 C360,60 720,150 1080,90 C1260,60 1380,80 1440,100 L1440,200 L0,200 Z" fill="#D4E5FF" fill-opacity="0.7"/>
      </svg>
      <div class="absolute -left-20 top-0 h-60 w-60 rounded-full bg-blue-200/50 blur-3xl"></div>
      <div class="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-100/30 blur-3xl"></div>
    </div>

    <div class="relative z-10 grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_160px_minmax(0,1fr)]">
      <div class="min-w-0 space-y-2">
        <h1 class="text-3xl font-bold text-slate-900 lg:text-4xl">个人简介</h1>
        <p class="text-base text-slate-600 lg:text-lg">认识我，了解我</p>
      </div>

      <div class="relative mx-auto">
        <div class="absolute -inset-2 rounded-full bg-gradient-to-br from-blue-200/20 to-blue-400/20 blur-xl"></div>
        <img
          alt="profile"
          src="https://picsum.photos/240"
          loading="lazy"
          class="relative h-32 w-32 rounded-full border-4 border-white object-cover shadow-xl lg:h-40 lg:w-40">
      </div>

      <div class="max-w-[320px] lg:max-w-none">
        <div class=" pl-6">
          <p class="text-base leading-7 text-[#3154a5] lg:text-lg relative pl-6">
            <span class="absolute left-0 top-1 text-3xl text-blue-400 font-serif">"</span>
            热爱生活，持续成长</p>
          <p class="text-base leading-7 text-[#3154a5] lg:text-lg relative">
            用文字和记录，遇见更好的自己。
            <span class=" bottom-0 text-3xl text-blue-400 font-serif">"</span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.banner-cu{
  border-radius: 12px 12px 0 0 ;
}
</style>
