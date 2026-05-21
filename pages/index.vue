<template>
  <div class="home-container">
    <div class="animate-slide-up animation-delay-200">
      <HomeBanner />
    </div>

    <div class="mt-5 lg:mt-6 px-5">
      <div class="grid grid-cols-1 gap-5 xl:grid-cols-[380px_minmax(0,1fr)] lg:gap-6">
        <div class="animate-slide-up animation-delay-300">
          <HomeProfileCard />
        </div>
        <div class="space-y-5 lg:space-y-6">
          <div class="animate-slide-up animation-delay-400">
            <HomeIntroCard />
          </div>
          <div class="animate-slide-up animation-delay-500">
            <HomeTagCard />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>
