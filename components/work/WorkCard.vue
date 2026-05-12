<template>
  <div class="bg-white rounded-[28px] border border-orange-100 p-8 hover:shadow-md transition">

    <div class="flex items-start justify-between">

      <div class="flex-1">

        <div class="flex items-center gap-4 mb-5">
          <div class="w-2 h-10 rounded-full bg-orange-500"></div>

          <h3 class="text-3xl font-bold">
            {{ title }}
          </h3>
        </div>

        <p class="text-gray-500 text-xl leading-9 mb-6 line-clamp-2">
          {{ desc }}
        </p>

        <div class="flex gap-3">
          <span
              v-for="tag in tags"
              :key="tag"
              class="px-4 py-1 rounded-xl bg-orange-50 text-orange-500"
          >
            {{ tag }}
          </span>
        </div>

      </div>

      <div class="text-right ml-10">
        <div class="text-gray-400 mb-5">
          {{ date }}
        </div>

        <div class="flex gap-5 text-gray-400">
          <span>👍 {{ likes }}</span>
          <span>💬 {{ comments }}</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  desc: String,
  tags: Array,
  date: String,
  likes: Number,
  comments: Number
})
</script>