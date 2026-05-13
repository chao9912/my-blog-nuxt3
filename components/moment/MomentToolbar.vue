<script setup lang="ts">
import { ref } from 'vue'

const viewMode = ref('grid')
const selectedTime = ref('all')
const selectedCategory = ref('all')

const timeOptions = ['全部时间', '近一周', '近一个月', '近一年']
const categoryOptions = ['全部分类', '旅行', '生活', '美食', '宠物', '工作']

function toggleView() {
  viewMode.value = viewMode.value === 'grid' ? 'list' : 'grid'
}
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      <select
        v-model="selectedTime"
        class="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#22C7D6]/30 focus:border-[#22C7D6]"
      >
        <option v-for="option in timeOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
      
      <select
        v-model="selectedCategory"
        class="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#22C7D6]/30 focus:border-[#22C7D6]"
      >
        <option v-for="option in categoryOptions" :key="option" :value="option">
          {{ option }}
        </option>
      </select>
    </div>
    
    <div class="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
      <button
        @click="toggleView"
        class="p-2.5 rounded-lg transition-all duration-200"
        :class="viewMode === 'grid'
          ? 'bg-white text-[#22C7D6] shadow-sm'
          : 'text-gray-500 hover:text-gray-700'"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5">
          <rect x="3" y="3" width="7" height="7"/>
          <rect x="14" y="3" width="7" height="7"/>
          <rect x="14" y="14" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/>
        </svg>
      </button>
      <button
        @click="toggleView"
        class="p-2.5 rounded-lg transition-all duration-200"
        :class="viewMode === 'list'
          ? 'bg-white text-[#22C7D6] shadow-sm'
          : 'text-gray-500 hover:text-gray-700'"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5">
          <line x1="8" y1="6" x2="21" y2="6"/>
          <line x1="8" y1="12" x2="21" y2="12"/>
          <line x1="8" y1="18" x2="21" y2="18"/>
          <line x1="3" y1="6" x2="3.01" y2="6"/>
          <line x1="3" y1="12" x2="3.01" y2="12"/>
          <line x1="3" y1="18" x2="3.01" y2="18"/>
        </svg>
      </button>
    </div>
  </div>
</template>