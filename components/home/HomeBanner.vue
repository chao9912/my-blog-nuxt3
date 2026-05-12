<template>
  <section class="relative overflow-hidden rounded-[28px] border border-blue-100 bg-gradient-to-r from-[#edf5ff] via-[#f5f9ff] to-[#fbfdff] px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12 xl:px-14">
    <div class="absolute -left-20 -top-24 h-56 w-56 rounded-full bg-blue-200/40 blur-2xl sm:h-72 sm:w-72"></div>
    <div class="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-white/40 to-transparent"></div>

    <div class="relative z-10 grid items-center gap-8 xl:grid-cols-[minmax(0,1fr)_auto]">
      <div class="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
        <div class="min-w-0">
          <h1 class="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">个人简介</h1>
          <p class="mt-4 text-lg text-slate-600 sm:text-xl lg:text-2xl">认识我，了解我</p>
        </div>

        <img
          alt="profile"
          src="https://picsum.photos/240"
          class="mx-auto h-32 w-32 rounded-full border-8 border-white object-cover shadow-lg sm:h-40 sm:w-40 lg:h-[180px] lg:w-[180px]"
        >
      </div>

      <div class="max-w-[420px] text-base leading-8 text-[#3154a5] sm:text-lg lg:text-xl xl:justify-self-end">
        热爱生活，持续成长
        <br>
        用文字和记录，遇见更好的自己。
      </div>
    </div>
  </section>
</template>
