<script setup lang="ts">
import { ref } from 'vue'

const viewMode = ref('grid')
const selectedTime = ref('all')
const selectedCategory = ref('all')

const timeOptions = [
    {
      label: '全部时间',
      value: 'all'
    },
    {
      label: '最近一周',
      value: 'week'
    },
    {
      label: '最近一个月',
      value: 'month'
    },
    {
      label: '最近三个月',
      value: 'quarter'
    }
]
const categoryOptions = [
    {
      label: '全部分类',
      value: 'all'
    },
    {
      label: '视频',
      value: 'video'
    },
    {
      label: '图片',
      value: 'image'
    },
    {
      label: '文档',
      value: 'document'
    },
    {
      label: '音乐',
      value: 'music'
    },
    {
      label: '其他',
      value: 'other'
    }
]

function toggleView() {
  viewMode.value = viewMode.value === 'grid' ? 'list' : 'grid'
}
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      <ClientSelect v-model="selectedTime" :options="timeOptions"  class="w-40"/>
      <ClientSelect v-model="selectedCategory" :options="categoryOptions"  class="w-40"/>
    </div>
  </div>
</template>
