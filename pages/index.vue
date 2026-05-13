<template>
  <div >
    <HomeBanner />

    <div class="mt-5 space-y-5 lg:mt-6 lg:space-y-6 px-5">
      <div class="animate-slide-up animation-delay-300">
        <HomeFeatureGrid />
      </div>

      <div class="grid grid-cols-1 gap-5 xl:grid-cols-[360px_minmax(0,1fr)] lg:gap-6">
        <div class="animate-slide-up animation-delay-400">
          <HomeProfileCard />
        </div>
        <div class="animate-slide-up animation-delay-500 ">
          <HomeTagCard />
          <div class="animate-slide-up animation-delay-600 mt-5">
            <HomeIntroCard />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HomeBanner from '@/components/home/HomeBanner.vue'
import HomeFeatureGrid from '@/components/home/HomeFeatureGrid.vue'
import HomeProfileCard from '@/components/home/HomeProfileCard.vue'
import HomeTagCard from '@/components/home/HomeTagCard.vue'
import HomeIntroCard from '@/components/home/HomeIntroCard.vue'
</script>
