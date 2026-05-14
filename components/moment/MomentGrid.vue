<script setup lang="ts">
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
  category: string
  mediaUrls?: string
  createTime?: string
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
      :id="moment.id"
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
      :category="moment.category"
      :mediaUrls="moment.mediaUrls"
      :createTime="moment.createTime"
    />
  </div>
</template>