<script setup lang="ts">
import { computed } from 'vue'

interface MediaItem {
  vKey: string
  name: string
  url: string
}

const props = defineProps<{
  id:number,
  title: string
  desc: string
  cover: string
  tag: string
  date: string
  likes: number
  comments: number
  views: number
  isVideo?: boolean
  duration?: string
  category: string
  mediaUrls?: string
  createTime?: string
}>()

const mediaUrlsList = computed<MediaItem[]>(() => {
  if (!props.mediaUrls) {
    return []
  }

  if (props.category === 'photo' || props.category === 'mixed') {
    return `${props.cover},${props.mediaUrls}`
      .split(',')
      .map((url, index) => ({
        vKey: `${index}-${(new Date().getTime())}`,
        name: props.title,
        url: url.trim()
      }))
      .filter(item => item.url)
  }

  if (props.category === 'video') {
    return [{
      vKey: props.title,
      name: props.title,
      url: props.mediaUrls
    }]
  }

  return []
})
</script>

<template>
  <div class="bg-white rounded-[12px] overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 group cursor-pointer">
    <div class="relative overflow-hidden">
      <n-carousel
          autoplay
          v-if="category==='photo'"
          direction="vertical"
          dot-placement="right"
          class="w-full h-[200px]">
        <img class="object-cover" v-for="item in mediaUrlsList" :key="item.vKey" :src="item.url" alt="图片">
      </n-carousel>
      <n-image  v-else width="100%"   class="w-full h-[200px] object-cover group-hover:scale-105 transition-transform duration-500" :src="cover" alt="图片"/>
      <div v-if="isVideo && duration" class="absolute bottom-3 right-3 px-2.5 py-1 bg-black/70 rounded-lg text-white text-xs font-medium">
        {{ duration }}
      </div>
      <div v-if="isVideo" class="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div class="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
          <svg viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-[#22C7D6] ml-1">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
    </div>

    <div class="p-4">
      <h3 class="text-base font-semibold text-gray-900 mb-2 line-clamp-1">
        {{ title }}
      </h3>

      <p class="text-sm text-gray-500 line-clamp-2 leading-relaxed mb-3">
        {{ desc }}
      </p>

      <div class="inline-flex px-3 py-1 rounded-lg bg-[var(--theme-color-50)] text-[var(--theme-color)] text-xs font-medium mb-4">
        {{ tag }}
      </div>

      <div class="flex items-center justify-between text-gray-400 text-xs">
        <span>{{ date }}</span>

        <div class="flex items-center gap-4">
          <span class="flex items-center gap-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            {{ likes }}
          </span>
          <span class="flex items-center gap-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            {{ comments }}
          </span>
          <span class="flex items-center gap-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            {{ views }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
