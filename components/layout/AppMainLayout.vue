<script setup lang="ts">

</script>

<template>
  <div class="min-h-screen p-3 sm:p-4 lg:p-5 bg-[var(--theme-color-10)]">
    <div class="mx-auto grid  gap-4 lg:grid-cols-[280px_minmax(0,1fr)] xl:gap-5">
      <AppSidebar />

      <div class="min-w-0  border border-slate-200/80 bg-white/90 shadow-[0_18px_50px_rgba(15,23,42,0.06)] relative rounded-xl">
        <div class=" px-5 pb-4 pt-5 sm:px-5 lg:px-6 absolute  z-10 right-0">
          <AppHeader />
        </div>

        <main class="min-w-0 ">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>
