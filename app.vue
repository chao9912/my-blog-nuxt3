<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <Transition name="fade">
      <div v-if="isLoading" class="loading-overlay">
        <div class="loading-content">
          <div class="loading-logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-12 h-12 text-[var(--theme-color)]">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
          </div>
          <div class="loading-text">
            <span class="loading-char" v-for="(char, index) in loadingChars" :key="index" :style="{ animationDelay: `${index * 100}ms` }">
              {{ char }}
            </span>
          </div>
          <div class="loading-bar">
            <div class="loading-bar-progress"></div>
          </div>
        </div>
      </div>
    </Transition>
  </n-config-provider>
</template>

<script setup lang="ts">
import { zhCN, dateZhCN } from 'naive-ui'
const isLoading = ref(true)
const loadingChars = ['加', '载', '中', '.', '.', '.']

let timer: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  timer = setTimeout(() => {
    isLoading.value = false
  }, 1500)
})

onUnmounted(() => {
  if (timer) {
    clearTimeout(timer)
  }
})
</script>

<style>
html,
body,
#__nuxt {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

body {
  background: #f5f7fb;
  font-family:
      Inter,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      sans-serif;
}

* {
  box-sizing: border-box;
}

a {
  text-decoration: none;
  color: inherit;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.85);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes pulseSlow {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes charPop {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
  }
  50% {
    opacity: 1;
    transform: translateY(-5px) scale(1.1);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes barProgress {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
  opacity: 0;
}

.animate-slide-up {
  animation: slideUp 0.6s ease-out forwards;
  opacity: 0;
}

.animate-scale-in {
  animation: scaleIn 0.6s ease-out forwards;
  opacity: 0;
}

.animate-pulse-slow {
  animation: pulseSlow 4s ease-in-out infinite;
}

.animation-delay-100 {
  animation-delay: 100ms;
}

.animation-delay-200 {
  animation-delay: 200ms;
}

.animation-delay-300 {
  animation-delay: 300ms;
}

.animation-delay-400 {
  animation-delay: 400ms;
}

.animation-delay-500 {
  animation-delay: 500ms;
}

.animation-delay-600 {
  animation-delay: 600ms;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #ffffff 0%, #f5f7fb 50%, #ffffff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(10px);
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.loading-logo {
  animation: bounceIn 1s ease-out forwards;
  opacity: 0;
}

.loading-logo svg {
  filter: drop-shadow(0 8px 25px rgba(var(--theme-color-rgb), 0.3));
}

.loading-text {
  display: flex;
  gap: 4px;
  font-size: 20px;
  font-weight: 600;
  color: #374151;
}

.loading-char {
  display: inline-block;
  animation: charPop 0.6s ease-out forwards;
  opacity: 0;
}

.loading-bar {
  width: 200px;
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  overflow: hidden;
}

.loading-bar-progress {
  height: 100%;
  background: linear-gradient(90deg, var(--theme-color-400), var(--theme-color-600));
  border-radius: 2px;
  animation: barProgress 1.5s ease-out forwards;
}

.fade-enter-active {
  transition: opacity 0.5s ease;
}

.fade-leave-active {
  animation: fadeOut 0.5s ease forwards;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
