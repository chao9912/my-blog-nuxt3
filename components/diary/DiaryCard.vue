<template>
  <div class="bg-white rounded-[28px] border border-green-100 p-8 hover:shadow-md transition">

    <div class="flex gap-8">

      <div class="w-[110px] h-[110px] rounded-2xl bg-[#f4faf5] flex flex-col items-center justify-center shrink-0">
        <div class="text-5xl font-bold">
          {{ day }}
        </div>

        <div class="text-gray-500 mt-2">
          {{ month }}
        </div>
      </div>

      <div class="flex-1">

        <h3 class="text-3xl font-bold mb-4">
          {{ title }}
        </h3>

        <p class="text-gray-500 text-xl leading-9 line-clamp-2 mb-5">
          {{ desc }}
        </p>

        <div class="flex items-center justify-between">

          <div class="flex gap-3">
            <span
                v-for="tag in tags"
                :key="tag"
                class="px-4 py-1 rounded-xl bg-green-50 text-green-600"
            >
              {{ tag }}
            </span>
          </div>

          <div class="flex gap-6 text-gray-400 text-lg">
            <span>❤️ 24</span>
            <span>💬 7</span>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  day: String,
  month: String,
  title: String,
  desc: String,
  tags: Array
})
</script>