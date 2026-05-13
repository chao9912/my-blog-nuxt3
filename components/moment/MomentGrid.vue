<script setup lang="ts">
import MomentCard from './MomentCard.vue'

interface Moment {
  id: number
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
}

defineProps<{
  moments: Moment[]
}>()
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    <MomentCard
      v-for="moment in moments"
      :key="moment.id"
      :title="moment.title"
      :desc="moment.desc"
      :cover="moment.cover"
      :tag="moment.tag"
      :date="moment.date"
      :likes="moment.likes"
      :comments="moment.comments"
      :views="moment.views"
      :is-video="moment.isVideo"
      :duration="moment.duration"
    />
  </div>
</template>