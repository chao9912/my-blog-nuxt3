<script setup lang="ts">
const activeFilter = ref('all')

const filters = [
  {key: 'all', label: '全部'},
  {key: 'photo', label: '照片'},
  {key: 'video', label: '视频'},
  {key: 'mixed', label: '图文'},
  {key: 'favorite', label: '收藏'}
]

function setFilter(key: string) {
  activeFilter.value = key
}
</script>

<template>
  <div class="flex items-center gap-1">
    <client-only>
      <n-tabs :default-value="activeFilter" animated size="large">
        <n-tab-pane :name="item.key" :tab=" item.label" v-for="item in filters" :key="item.key">
          <slot></slot>
        </n-tab-pane>
      </n-tabs>
    </client-only>
  </div>
</template>
