<script setup lang="ts">
import { ref } from 'vue'

const viewMode = ref('grid')
const selectedTime = ref('all')

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

function toggleView() {
  viewMode.value = viewMode.value === 'grid' ? 'list' : 'grid'
}
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      <ClientSelect v-model="selectedTime" :options="timeOptions"  class="w-40"/>
    </div>
  </div>
</template>
