<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'
</script>

<template>
  <div class="min-h-screen bg-slate-100/90 p-3 sm:p-4 lg:p-5">
    <div class="mx-auto grid max-w-[1600px] gap-4 lg:grid-cols-[280px_minmax(0,1fr)] xl:gap-5">
      <AppSidebar />

      <div class="min-w-0 rounded-[28px] border border-slate-200/80 bg-white/90 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
        <div class="border-b border-slate-100 px-4 pb-4 pt-4 sm:px-5 lg:px-6">
          <AppHeader />
        </div>

        <main class="min-w-0 p-4 sm:p-5 lg:p-6">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>
