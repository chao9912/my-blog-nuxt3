<script setup lang="ts">
import { ref, watch } from 'vue'

const emit = defineEmits<{
  (e: 'update:timeRange', value: string): void
}>()

const selectedTime = ref('')

const timeOptions = [
    {
      label: '全部时间',
      value: ''
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

watch(selectedTime, (newValue) => {
  emit('update:timeRange', newValue)
})
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      <ClientSelect 
        v-model="selectedTime" 
        :options="timeOptions"  
        class="w-40"
      />
    </div>
  </div>
</template>
