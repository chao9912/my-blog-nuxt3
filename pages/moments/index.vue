<script setup lang="ts">
import { fetchMomentList } from '@/composables/momentsApi'
import MomentFilter from '@/components/moment/MomentFilter.vue'
import MomentToolbar from '@/components/moment/MomentToolbar.vue'
import MomentGrid from '@/components/moment/MomentGrid.vue'
import AppLoading from '@/components/common/AppLoading.vue'

interface MomentItem {
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

const moments = ref<MomentItem[]>([])
const page = ref(1)
const total = ref(0)
const loading = ref(false)
const pageSize = 8

async function loadMomentList() {
  loading.value = true
  try {
    const currentPage: number = page.value || 1
    const result = await fetchMomentList(currentPage, pageSize)
    moments.value = result.list
    page.value = result.page
    total.value = result.total
  } catch (error) {
    console.error('Failed to fetch moments:', error)
  } finally {
    loading.value = false
  }
}

function updatePage(e:number) {
  page.value = e
  loadMomentList()
}

onMounted(() => {
  loadMomentList()
})
</script>

<template>
  <div>
    <section class="banner-cu relative overflow-hidden px-6 pb-8 pt-[84px] lg:px-10 lg:pb-12 lg:pt-[84px]" style="background: linear-gradient(135deg, var(--theme-color-50), var(--theme-color-100), var(--theme-color-50));">
      <div class="absolute inset-0 z-0 overflow-hidden">
        <div class="absolute -left-20 top-0 h-60 w-60 rounded-full blur-3xl" :style="{ backgroundColor: 'color-mix(in srgb, var(--theme-color) 20%, transparent)' }"></div>
        <div class="absolute right-0 top-0 h-40 w-40 rounded-full blur-3xl" :style="{ backgroundColor: 'color-mix(in srgb, var(--theme-color) 10%, transparent)' }"></div>
      </div>

      <div class="relative z-10 flex items-center gap-6">
        <div class="relative">
          <div class="absolute -inset-3 rounded-full blur-xl" :style="{ background: `linear-gradient(135deg, color-mix(in srgb, var(--theme-color) 30%, transparent), color-mix(in srgb, var(--theme-color) 30%, transparent))` }"></div>
          <div class="relative w-20 h-20 rounded-full flex items-center justify-center shadow-xl" :style="{ background: `linear-gradient(135deg, var(--theme-color-400), var(--theme-color-600))` }">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" class="w-8 h-8">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
          </div>
        </div>

        <div>
          <h1 class="text-2xl font-bold text-gray-900 lg:text-3xl">小辫子（精彩瞬间）</h1>
          <p class="text-sm text-gray-500 lg:text-base mt-1">定格美好瞬间，记录闪光时刻</p>
        </div>

        <button class="ml-auto flex items-center gap-2 px-5 py-2.5 text-white font-medium rounded-xl shadow-lg transition-all duration-200" :style="{ background: `linear-gradient(135deg, var(--theme-color-500), var(--theme-color-600))`, boxShadow: `0 10px 25px color-mix(in srgb, var(--theme-color) 30%, transparent)` }" style="hover:box-shadow: 0 12px 30px color-mix(in srgb, var(--theme-color) 40%, transparent);">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          <span>发布瞬间</span>
        </button>
      </div>
    </section>

    <div class="px-6 py-5 lg:px-10 lg:py-6">
      <div class="flex items-center justify-between ">
        <MomentFilter />
        <MomentToolbar />
      </div>

      <AppLoading v-if="loading" />
      <MomentGrid v-else :moments="moments" />

      <div v-if="!loading" class="flex items-center justify-center mt-8">
        <n-pagination v-model:page="page"
                      :item-count="total"
                      size="large"
                      :on-update:page="updatePage"/>
<!--        <div class="flex items-center gap-2">-->
<!--          <button-->
<!--            @click="prevPage"-->
<!--            :disabled="page === 1"-->
<!--            class="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"-->
<!--          >-->
<!--            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5">-->
<!--              <path d="M15 19l-7-7 7-7"/>-->
<!--            </svg>-->
<!--          </button>-->

<!--          <template v-if="totalPages <= 5">-->
<!--            <button-->
<!--              v-for="pageNum in totalPages"-->
<!--              :key="pageNum"-->
<!--              @click="goToPage(pageNum)"-->
<!--              class="w-10 h-10 rounded-xl font-medium transition-all duration-200"-->
<!--              :class="page === pageNum-->
<!--                ? 'text-white shadow-lg'-->
<!--                : 'text-gray-600 hover:bg-gray-50 border border-gray-200'"-->
<!--              :style="page === pageNum ? { background: `linear-gradient(135deg, var(&#45;&#45;theme-color-500), var(&#45;&#45;theme-color-600))`, boxShadow: `0 4px 15px color-mix(in srgb, var(&#45;&#45;theme-color) 30%, transparent)` } : {}"-->
<!--            >-->
<!--              {{ pageNum }}-->
<!--            </button>-->
<!--          </template>-->

<!--          <template v-else>-->
<!--            <button-->
<!--              @click="goToPage(1)"-->
<!--              class="w-10 h-10 rounded-xl font-medium transition-all duration-200"-->
<!--              :class="page === 1-->
<!--                ? 'text-white shadow-lg'-->
<!--                : 'text-gray-600 hover:bg-gray-50 border border-gray-200'"-->
<!--              :style="page === 1 ? { background: `linear-gradient(135deg, var(&#45;&#45;theme-color-500), var(&#45;&#45;theme-color-600))`, boxShadow: `0 4px 15px color-mix(in srgb, var(&#45;&#45;theme-color) 30%, transparent)` } : {}"-->
<!--            >-->
<!--              1-->
<!--            </button>-->

<!--            <span v-if="page > 3" class="w-10 h-10 flex items-center justify-center text-gray-400">...</span>-->

<!--            <button-->
<!--              v-if="page > 2"-->
<!--              @click="goToPage(page - 1)"-->
<!--              class="w-10 h-10 rounded-xl font-medium text-gray-600 hover:bg-gray-50 border border-gray-200 transition-all duration-200"-->
<!--            >-->
<!--              {{ page - 1 }}-->
<!--            </button>-->

<!--            <button-->
<!--              class="w-10 h-10 rounded-xl font-medium text-white shadow-lg"-->
<!--              :style="{ background: `linear-gradient(135deg, var(&#45;&#45;theme-color-500), var(&#45;&#45;theme-color-600))`, boxShadow: `0 4px 15px color-mix(in srgb, var(&#45;&#45;theme-color) 30%, transparent)` }"-->
<!--            >-->
<!--              {{ page }}-->
<!--            </button>-->

<!--            <button-->
<!--              v-if="page < totalPages - 1"-->
<!--              @click="goToPage(page + 1)"-->
<!--              class="w-10 h-10 rounded-xl font-medium text-gray-600 hover:bg-gray-50 border border-gray-200 transition-all duration-200"-->
<!--            >-->
<!--              {{ page + 1 }}-->
<!--            </button>-->

<!--            <span v-if="page < totalPages - 2" class="w-10 h-10 flex items-center justify-center text-gray-400">...</span>-->

<!--            <button-->
<!--              @click="goToPage(totalPages)"-->
<!--              class="w-10 h-10 rounded-xl font-medium transition-all duration-200"-->
<!--              :class="page === totalPages-->
<!--                ? 'text-white shadow-lg'-->
<!--                : 'text-gray-600 hover:bg-gray-50 border border-gray-200'"-->
<!--              :style="page === totalPages ? { background: `linear-gradient(135deg, var(&#45;&#45;theme-color-500), var(&#45;&#45;theme-color-600))`, boxShadow: `0 4px 15px color-mix(in srgb, var(&#45;&#45;theme-color) 30%, transparent)` } : {}"-->
<!--            >-->
<!--              {{ totalPages }}-->
<!--            </button>-->
<!--          </template>-->

<!--          <button-->
<!--            @click="nextPage"-->
<!--            :disabled="page === totalPages"-->
<!--            class="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"-->
<!--          >-->
<!--            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5">-->
<!--              <path d="M9 5l7 7-7 7"/>-->
<!--            </svg>-->
<!--          </button>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>

<style scoped>
.banner-cu {
  border-radius: 12px 12px 0 0;
}
</style>
