<script setup lang="ts">
const modelValue = defineModel<string>({ default: 'all' })

const filters = [
  {key: 'all', label: '全部'},
  {key: 'photo', label: '照片'},
  {key: 'video', label: '视频'},
  {key: 'mixed', label: '图文'},
]
</script>

<template>
  <div class="flex items-center gap-1">
    <client-only>
      <n-tabs v-model:value="modelValue" animated size="large">
        <n-tab-pane :name="item.key" :tab=" item.label" v-for="item in filters" :key="item.key"></n-tab-pane>
      </n-tabs>
    </client-only>
  </div>
</template>
