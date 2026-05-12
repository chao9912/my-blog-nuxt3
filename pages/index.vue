<template>
  <div class="space-y-5 lg:space-y-6">
    <HomeBanner />

    <HomeFeatureGrid />

    <div class="grid grid-cols-1 gap-5 xl:grid-cols-[380px_minmax(0,1fr)] lg:gap-6">
      <HomeProfileCard />
      <HomeTagCard />
    </div>

    <HomeIntroCard />
  </div>
</template>

<script setup lang="ts">
import HomeBanner from '@/components/home/HomeBanner.vue'
import HomeFeatureGrid from '@/components/home/HomeFeatureGrid.vue'
import HomeProfileCard from '@/components/home/HomeProfileCard.vue'
import HomeTagCard from '@/components/home/HomeTagCard.vue'
import HomeIntroCard from '@/components/home/HomeIntroCard.vue'
</script>
