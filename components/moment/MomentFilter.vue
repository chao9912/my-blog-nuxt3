<script setup lang="ts">
const activeFilter = ref('all')

const filters = [
  { key: 'all', label: '全部' },
  { key: 'photo', label: '照片' },
  { key: 'video', label: '视频' },
  { key: 'mixed', label: '图文' },
  { key: 'favorite', label: '收藏' }
]

function setFilter(key: string) {
  activeFilter.value = key
}
</script>

<template>
  <div class="flex items-center gap-1">
    <button
      v-for="filter in filters"
      :key="filter.key"
      @click="setFilter(filter.key)"
      class="px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-200"
      :class="activeFilter === filter.key
        ? 'bg-gradient-to-r from-[#22C7D6] to-[#287FFD] text-white shadow-lg shadow-[#22C7D6]/30'
        : 'text-gray-600 hover:bg-gray-100'"
    >
      {{ filter.label }}
    </button>
  </div>
</template>