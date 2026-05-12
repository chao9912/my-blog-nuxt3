<template>
  <div class="bg-white rounded-[24px] overflow-hidden border border-gray-100 hover:shadow-xl transition group cursor-pointer">

    <div class="relative overflow-hidden">
      <img
          :src="cover"
          class="w-full h-[240px] object-cover group-hover:scale-105 transition duration-500"
      />
    </div>

    <div class="p-5">

      <h3 class="text-2xl font-bold mb-3 line-clamp-1">
        {{ title }}
      </h3>

      <p class="text-gray-500 line-clamp-2 text-lg leading-8 mb-4">
        {{ desc }}
      </p>

      <div class="inline-flex px-4 py-1 rounded-xl bg-sky-50 text-sky-500 mb-5">
        {{ tag }}
      </div>

      <div class="flex justify-between text-gray-400">
        <span>{{ date }}</span>

        <div class="flex gap-5">
          <span>❤️ {{ likes }}</span>
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
  cover: String,
  tag: String,
  date: String,
  likes: Number,
  comments: Number
})
</script>