<script setup lang="ts">
const { getMomentList } = useApi()

const page = ref(1)
const pageSize = 8
const category = ref('all')

watch(category, () => {
  page.value = 1
})

const { data: momentData, pending: loading, refresh } = useAsyncData(
  () => `moment-list-${page.value}-${category.value}`,
  () => getMomentList(page.value, pageSize, category.value)
)
const moments = computed(() => momentData.value?.list || [])
const total = computed(() => momentData.value?.total || 0)

const isPage = computed(() => {
  return total.value > pageSize
})

function updatePage(newPage: number) {
  page.value = newPage
}

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
        <MomentFilter v-model="category" />
        <MomentToolbar />
      </div>

      <AppLoading v-if="loading" />
      <Transition name="fade-slide">
        <MomentGrid v-if="!loading && moments.length > 0" :moments="moments" />
      </Transition>
      <div v-if="!loading && moments.length === 0" class="text-center py-12">
        <svg class="w-16 h-16 mx-auto text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
          <circle cx="12" cy="13" r="4"/>
        </svg>
        <p class="mt-4 text-gray-500">暂无动态数据</p>
      </div>
      <div v-if="!loading&&isPage" class="flex items-center justify-center mt-8">
        <n-pagination v-model:page="page"
                      :item-count="total"
                      :page-size="pageSize"
                      size="large"
                      :on-update:page="updatePage"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.banner-cu {
  border-radius: 12px 12px 0 0;
}

.fade-slide-enter-active {
  transition: all 0.5s ease-out;
}

.fade-slide-leave-active {
  transition: all 0.3s ease-in;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
