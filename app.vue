<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- Loading -->
    <Transition name="loading-fade">
      <div v-if="showLoading" class="loading-overlay">
        <!-- 背景动画 -->
        <div class="loading-bg">
          <div class="bg-circle bg-circle-1"></div>
          <div class="bg-circle bg-circle-2"></div>
          <div class="bg-circle bg-circle-3"></div>
        </div>

        <div class="loading-content">
          <!-- Logo容器 -->
          <div class="loading-logo-wrapper">
            <!-- 外圈轨道 -->
            <div class="logo-orbit">
              <div class="orbit-ring"></div>
              <div class="orbit-dot"></div>
            </div>
            
            <!-- Logo -->
            <div class="loading-logo">
              <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  class="loading-icon"
              >
                <path
                    d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
                />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>

            <!-- 光晕 -->
            <div class="loading-glow"></div>
          </div>

          <!-- 文字 -->
          <div class="loading-text">
            <span
                v-for="(char, index) in loadingChars"
                :key="index"
                class="loading-char"
                :style="{ animationDelay: `${index * 100}ms` }"
            >
              {{ char }}
            </span>
          </div>

          <!-- 进度条 -->
          <div class="loading-progress">
            <div
                class="loading-progress-bar"
                :style="{ width: `${progress}%` }"
            />
            <div class="progress-shine"></div>
          </div>

          <!-- 装饰点 -->
          <div class="loading-dots">
            <span v-for="i in 3" :key="i" class="dot" :style="{ animationDelay: `${i * 200}ms` }"></span>
          </div>
        </div>
      </div>
    </Transition>
  </n-config-provider>
</template>

<script setup lang="ts">
import { zhCN, dateZhCN } from 'naive-ui'

const showLoading = ref(true)
const progress = ref(0)

const loadingChars = ['加', '载', '中', '.', '.', '.']

const nuxtApp = useNuxtApp()

let progressTimer: NodeJS.Timeout

onMounted(() => {
  progressTimer = setInterval(() => {
    if (progress.value < 90) {
      progress.value += Math.random() * 15
    }
  }, 100)

  nuxtApp.hook('page:finish', async () => {
    progress.value = 100

    await nextTick()

    setTimeout(() => {
      showLoading.value = false
      clearInterval(progressTimer)
    }, 600)
  })
})

onUnmounted(() => {
  clearInterval(progressTimer)
})
</script>

<style>
html,
body,
#__nuxt {
  width: 100%;
  height: 100%;
  margin: 0;
}

body {
  overflow-x: hidden;
  background: #f5f7fb;
}

/* Loading */

.loading-overlay {
  position: fixed;
  inset: 0;
  z-index: 99999;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;

  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
}

/* 背景动画 */
.loading-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
}

.bg-circle-1 {
  width: 400px;
  height: 400px;
  top: -100px;
  left: -100px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.6), transparent);
  animation: bgFloat1 8s ease-in-out infinite;
}

.bg-circle-2 {
  width: 300px;
  height: 300px;
  bottom: -50px;
  right: -50px;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.5), transparent);
  animation: bgFloat2 6s ease-in-out infinite;
}

.bg-circle-3 {
  width: 250px;
  height: 250px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(59, 130, 246, 0.4), transparent);
  animation: bgFloat3 7s ease-in-out infinite;
}

/* 内容容器 */
.loading-content {
  position: relative;
  z-index: 10;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 32px;
}

/* Logo容器 */
.loading-logo-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 外圈轨道 */
.logo-orbit {
  position: absolute;
  width: 100%;
  height: 100%;
}

.orbit-ring {
  position: absolute;
  inset: 0;
  border: 2px solid rgba(99, 102, 241, 0.2);
  border-radius: 50%;
}

.orbit-dot {
  position: absolute;
  width: 8px;
  height: 8px;
  background: linear-gradient(135deg, var(--theme-color-400), var(--theme-color-600));
  border-radius: 50%;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 15px var(--theme-color), 0 0 30px rgba(var(--theme-color), 0.5);
  animation: orbitRotate 3s linear infinite;
}

/* Logo */
.loading-logo {
  position: relative;
  z-index: 2;

  animation: logoEnter 1s cubic-bezier(0.22, 1, 0.36, 1);
}

.loading-icon {
  width: 64px;
  height: 64px;

  color: var(--theme-color);

  filter: drop-shadow(0 0 20px rgba(var(--theme-color), 0.5));

  animation: logoPulse 2s ease-in-out infinite;
}

/* 光晕 */
.loading-glow {
  position: absolute;
  width: 140px;
  height: 140px;

  background: radial-gradient(
      circle,
      rgba(var(--theme-color-rgb), 0.15),
      transparent 70%
  );

  filter: blur(20px);

  animation: glowPulse 3s ease-in-out infinite;
}

/* 文字 */
.loading-text {
  display: flex;
  gap: 8px;

  font-size: 24px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);

  text-shadow: 0 0 30px rgba(var(--theme-color-rgb), 0.3);
}

.loading-char {
  animation: charWave 1s ease forwards;
  opacity: 0;
  display: inline-block;
}

/* 进度条 */
.loading-progress {
  position: relative;
  width: 280px;
  height: 8px;

  overflow: hidden;

  background: rgba(255, 255, 255, 0.1);

  border-radius: 999px;

  box-shadow: 
      inset 0 2px 4px rgba(0, 0, 0, 0.3),
      0 0 20px rgba(var(--theme-color-rgb), 0.2);
}

.loading-progress-bar {
  height: 100%;

  border-radius: inherit;

  background: linear-gradient(
      90deg,
      var(--theme-color-400),
      var(--theme-color-500),
      var(--theme-color-600)
  );

  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  box-shadow: 0 0 15px rgba(var(--theme-color-rgb), 0.5);
}

.progress-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.3) 50%,
      transparent 100%
  );
  animation: progressShine 2s ease-in-out infinite;
}

/* 装饰点 */
.loading-dots {
  display: flex;
  gap: 12px;
}

.dot {
  width: 8px;
  height: 8px;
  background: var(--theme-color);
  border-radius: 50%;
  opacity: 0.3;
  animation: dotPulse 1.5s ease-in-out infinite;
}

/* 动画 */

@keyframes bgFloat1 {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(30px, 30px) scale(1.1);
  }
}

@keyframes bgFloat2 {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(-30px, -20px) scale(1.2);
  }
}

@keyframes bgFloat3 {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.4;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.3);
    opacity: 0.6;
  }
}

@keyframes orbitRotate {
  0% {
    transform: translateX(-50%) rotate(0deg);
    transform-origin: 50% 60px;
  }
  100% {
    transform: translateX(-50%) rotate(360deg);
    transform-origin: 50% 60px;
  }
}

@keyframes logoEnter {
  0% {
    opacity: 0;
    transform: scale(0.5) translateY(30px);
  }
  50% {
    opacity: 1;
    transform: scale(1.1) translateY(-5px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes logoPulse {
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 20px rgba(var(--theme-color-rgb), 0.5));
  }
  50% {
    transform: scale(1.05);
    filter: drop-shadow(0 0 30px rgba(var(--theme-color-rgb), 0.7));
  }
}

@keyframes glowPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
}

@keyframes charWave {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
  }
  50% {
    opacity: 1;
    transform: translateY(-5px) scale(1.1);
  }
  70% {
    transform: translateY(3px) scale(1);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes progressShine {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(280px);
  }
}

@keyframes dotPulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.3);
  }
}

/* Transition */

.loading-fade-enter-active {
  transition: opacity 0.4s ease;
}

.loading-fade-leave-active {
  transition: 
      opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
      transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.loading-fade-enter-from {
  opacity: 0;
}

.loading-fade-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>
