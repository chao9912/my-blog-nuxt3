<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'

const message = useMessage()
const router = useRouter()

const isLoaded = ref(false)

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})

const title = ref('')
const desc = ref('')
const tag = ref('')
const category = ref('photo')
const isVideo = computed(() => category.value === 'video')
const duration = ref('')
const cover = ref('')
const mediaUrls = ref<string[]>([])
const isLoading = ref(false)

const categories = [
  { value: 'photo', label: '照片', icon: '🖼️' },
  { value: 'video', label: '视频', icon: '🎬' },
  { value: 'mixed', label: '图文', icon: '📝' }
]

const isFormValid = computed(() => {
  return title.value.trim() && desc.value.trim() && cover.value && mediaUrls.value.length > 0
})

const handleCoverUpload = async () => {
  try {
    const response = await $fetch('/api/upload/image', {
      method: 'POST',
      credentials: 'include',
      headers: useRequestEvent()?.headers
    })
    cover.value = response.data.url
    message.success('封面上传成功')
  } catch (error) {
    message.error('封面上传失败')
  }
}

const handleMediaUpload = async () => {
  try {
    const response = await $fetch('/api/upload/image', {
      method: 'POST',
      credentials: 'include',
      headers: useRequestEvent()?.headers
    })
    mediaUrls.value.push(response.data.url)
    message.success('媒体上传成功')
  } catch (error) {
    message.error('媒体上传失败')
  }
}

const removeMedia = (index: number) => {
  mediaUrls.value.splice(index, 1)
}

const handleSubmit = async () => {
  if (!isFormValid.value) {
    message.error('请填写完整信息')
    return
  }

  isLoading.value = true

  try {
    const response = await $fetch('/api/moment/create', {
      method: 'POST',
      body: {
        title: title.value.trim(),
        desc: desc.value.trim(),
        cover: cover.value,
        tag: tag.value.trim() || '日常',
        date: new Date().toLocaleDateString('zh-CN'),
        category: category.value,
        isVideo: isVideo.value,
        duration: isVideo.value ? duration.value : undefined,
        mediaUrls: mediaUrls.value.join(',')
      },
      credentials: 'include',
      headers: useRequestEvent()?.headers
    })

    if (response.code === 200) {
      message.success('发布成功')
      await router.push('/moments')
    } else {
      message.error(response.message || '发布失败')
    }
  } catch (error: any) {
    message.error(error.response?._data?.message || '发布失败，请稍后重试')
  } finally {
    isLoading.value = false
  }
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="create-moment-container">
    <Transition name="slide-fade">
      <section 
        v-show="isLoaded"
        class="banner-cu relative overflow-hidden px-6 pb-6 pt-[84px] lg:px-10 lg:pb-8"
      >
        <div class="flex items-center gap-4">
          <button 
            class="back-btn flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            @click="goBack"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
            <span class="text-sm font-medium">返回</span>
          </button>
          <h1 class="text-xl font-bold text-gray-900 lg:text-2xl">发布瞬间</h1>
        </div>
      </section>
    </Transition>

    <div class="px-6 py-5 lg:px-10 lg:py-6 max-w-2xl mx-auto">
      <div class="space-y-6">
        <div class="form-section">
          <label class="form-label">标题</label>
          <input 
            v-model="title"
            type="text" 
            placeholder="输入动态标题" 
            class="form-input"
          />
        </div>

        <div class="form-section">
          <label class="form-label">描述</label>
          <textarea 
            v-model="desc"
            placeholder="分享你的精彩瞬间..." 
            class="form-textarea"
            rows="4"
          ></textarea>
        </div>

        <div class="form-section">
          <label class="form-label">标签</label>
          <input 
            v-model="tag"
            type="text" 
            placeholder="添加标签，用逗号分隔" 
            class="form-input"
          />
        </div>

        <div class="form-section">
          <label class="form-label">分类</label>
          <div class="category-grid">
            <button 
              v-for="cat in categories" 
              :key="cat.value"
              class="category-btn"
              :class="{ active: category === cat.value }"
              @click="category = cat.value"
            >
              <span class="text-lg">{{ cat.icon }}</span>
              <span>{{ cat.label }}</span>
            </button>
          </div>
        </div>

        <div v-if="isVideo" class="form-section">
          <label class="form-label">视频时长</label>
          <input 
            v-model="duration"
            type="text" 
            placeholder="例如：00:30" 
            class="form-input"
          />
        </div>

        <div class="form-section">
          <label class="form-label">封面图片</label>
          <div class="upload-area" @click="handleCoverUpload">
            <div v-if="cover" class="upload-preview">
              <img :src="cover" alt="封面" />
              <button class="remove-btn" @click.stop="cover = ''">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div v-else class="upload-placeholder">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-8 h-8">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              <span>点击上传封面</span>
            </div>
          </div>
        </div>

        <div class="form-section">
          <div class="flex items-center justify-between">
            <label class="form-label">媒体资源</label>
            <button 
              class="add-media-btn flex items-center gap-1 text-sm text-theme-color hover:opacity-80 transition-opacity"
              @click="handleMediaUpload"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              <span>添加图片/视频</span>
            </button>
          </div>
          <div class="media-grid">
            <div 
              v-for="(url, index) in mediaUrls" 
              :key="index"
              class="media-item"
            >
              <img :src="url" :alt="`媒体${index + 1}`" />
              <button class="remove-btn" @click="removeMedia(index)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div v-if="mediaUrls.length === 0" class="media-placeholder">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="12" cy="12" r="4"/>
              </svg>
              <span>暂无媒体</span>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button 
            class="submit-btn flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-medium transition-all duration-200"
            :class="{ disabled: !isFormValid || isLoading }"
            :disabled="!isFormValid || isLoading"
            @click="handleSubmit"
          >
            <svg v-if="isLoading" viewBox="0 0 24 24" fill="none" class="w-5 h-5 animate-spin">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="17 8 12 3 7 8"/>
              <line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            <span>{{ isLoading ? '发布中...' : '发布瞬间' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.create-moment-container {
  min-height: 100vh;
  background: linear-gradient(180deg, var(--theme-color-50) 0%, #f8fafc 30%);
}

.banner-cu {
  background: linear-gradient(135deg, var(--theme-color-50), var(--theme-color-100), var(--theme-color-50));
  position: relative;
}

.banner-cu::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -20%;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, var(--theme-color-200) 0%, transparent 70%);
  border-radius: 50%;
}

.banner-cu::after {
  content: '';
  position: absolute;
  bottom: -30%;
  right: -10%;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, var(--theme-color-100) 0%, transparent 70%);
  border-radius: 50%;
}

.back-btn {
  color: #64748b;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}

.back-btn:hover {
  color: var(--theme-color);
  background: #ffffff;
  transform: translateX(-2px);
}

.form-section {
  background: #ffffff;
  padding: 24px;
  border-radius: 20px;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.04),
    0 1px 3px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
}

.form-section:hover {
  box-shadow: 
    0 8px 30px rgba(0, 0, 0, 0.06),
    0 2px 6px rgba(0, 0, 0, 0.08);
  transform: translateY(-1px);
}

.form-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 12px;
}

.form-label::before {
  content: '';
  width: 3px;
  height: 14px;
  background: linear-gradient(180deg, var(--theme-color-400), var(--theme-color-600));
  border-radius: 2px;
}

.form-input {
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1.5px solid #e2e8f0;
  border-radius: 14px;
  font-size: 15px;
  color: #1e293b;
  background: #fafbfc;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
}

.form-input:hover {
  border-color: #cbd5e1;
  background: #ffffff;
}

.form-input:focus {
  outline: none;
  border-color: var(--theme-color);
  background: #ffffff;
  box-shadow: 
    0 0 0 4px rgba(var(--theme-color-500), 0.08),
    0 0 20px rgba(var(--theme-color-500), 0.1);
  transform: translateY(-1px);
}

.form-input::placeholder {
  color: #94a3b8;
  font-weight: 400;
}

.form-textarea {
  width: 100%;
  padding: 14px 16px;
  border: 1.5px solid #e2e8f0;
  border-radius: 14px;
  font-size: 15px;
  color: #1e293b;
  background: #fafbfc;
  resize: vertical;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
  min-height: 100px;
}

.form-textarea:hover {
  border-color: #cbd5e1;
  background: #ffffff;
}

.form-textarea:focus {
  outline: none;
  border-color: var(--theme-color);
  background: #ffffff;
  box-shadow: 
    0 0 0 4px rgba(var(--theme-color-500), 0.08),
    0 0 20px rgba(var(--theme-color-500), 0.1);
}

.form-textarea::placeholder {
  color: #94a3b8;
  font-weight: 400;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.category-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 10px;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  background: #fafbfc;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.category-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--theme-color-400), var(--theme-color-600));
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.category-btn:hover {
  border-color: var(--theme-color-300);
  background: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.category-btn:hover::before {
  transform: scaleX(1);
}

.category-btn span:first-child {
  font-size: 24px;
  transition: transform 0.3s ease;
}

.category-btn:hover span:first-child {
  transform: scale(1.1);
}

.category-btn span:last-child {
  font-size: 13px;
  color: #64748b;
  font-weight: 500;
}

.category-btn.active {
  border-color: var(--theme-color);
  background: var(--theme-color-50);
  box-shadow: 
    0 0 0 3px rgba(var(--theme-color-500), 0.1),
    0 4px 16px rgba(var(--theme-color-500), 0.15);
}

.category-btn.active::before {
  transform: scaleX(1);
}

.category-btn.active span:last-child {
  color: var(--theme-color);
  font-weight: 600;
}

.video-toggle {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 22px;
  border: 2px solid #e2e8f0;
  border-radius: 24px;
  background: #fafbfc;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: #475569;
  font-size: 14px;
  font-weight: 500;
}

.video-toggle:hover {
  border-color: var(--theme-color-300);
  background: #ffffff;
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}

.video-toggle.active {
  border-color: var(--theme-color);
  background: linear-gradient(135deg, var(--theme-color-50), var(--theme-color-100));
  color: var(--theme-color);
  box-shadow: 
    0 0 0 3px rgba(var(--theme-color-500), 0.1),
    0 4px 16px rgba(var(--theme-color-500), 0.15);
}

.upload-area {
  width: 100%;
  min-height: 180px;
  border: 2px dashed #cbd5e1;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  background: #fafbfc;
}

.upload-area:hover {
  border-color: var(--theme-color);
  background: linear-gradient(135deg, var(--theme-color-50), #ffffff);
  transform: scale(1.01);
}

.upload-placeholder {
  width: 100%;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #94a3b8;
  transition: all 0.3s ease;
}

.upload-area:hover .upload-placeholder svg {
  transform: scale(1.1) rotate(-5deg);
  color: var(--theme-color);
}

.upload-area:hover .upload-placeholder span {
  color: var(--theme-color);
}

.upload-preview {
  position: relative;
  width: 100%;
  height: 180px;
}

.upload-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.upload-preview:hover img {
  transform: scale(1.05);
}

.upload-preview .remove-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  color: #ffffff;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(4px);
}

.upload-preview .remove-btn:hover {
  background: var(--theme-color);
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(var(--theme-color-500), 0.4);
}

.add-media-btn {
  font-weight: 600;
  padding: 8px 14px;
  border-radius: 8px;
  transition: all 0.25s ease;
}

.add-media-btn:hover {
  background: var(--theme-color-50);
  transform: scale(1.02);
}

.media-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-top: 16px;
}

.media-item {
  position: relative;
  aspect-ratio: 1;
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.media-item:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.media-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.media-item:hover img {
  transform: scale(1.1);
}

.media-item .remove-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  color: #ffffff;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  backdrop-filter: blur(4px);
}

.media-item:hover .remove-btn {
  opacity: 1;
}

.media-item .remove-btn:hover {
  background: var(--theme-color);
  transform: scale(1.1);
}

.media-placeholder {
  grid-column: span 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 40px;
  border: 2px dashed #e2e8f0;
  border-radius: 16px;
  color: #94a3b8;
  background: #fafbfc;
  transition: all 0.3s ease;
}

.media-placeholder:hover {
  border-color: var(--theme-color-300);
  background: var(--theme-color-50);
}

.media-placeholder:hover svg {
  color: var(--theme-color);
}

.form-actions {
  display: flex;
  justify-content: center;
  padding: 24px;
  gap: 16px;
}

.submit-btn {
  color: #ffffff;
  background: linear-gradient(135deg, var(--theme-color-500), var(--theme-color-600));
  box-shadow: 
    0 6px 20px rgba(var(--theme-color-500), 0.3),
    0 2px 6px rgba(var(--theme-color-500), 0.2);
  border: none;
}

.submit-btn:hover:not(.disabled) {
  transform: translateY(-3px);
  box-shadow: 
    0 10px 30px rgba(var(--theme-color-500), 0.4),
    0 4px 12px rgba(var(--theme-color-500), 0.3);
}

.submit-btn:active:not(.disabled) {
  transform: translateY(-1px);
}

.submit-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(var(--theme-color-500), 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(var(--theme-color-500), 0.5);
  }
}

.submit-btn:not(.disabled):hover {
  animation: pulse-glow 2s ease-in-out infinite;
}

.slide-fade-enter-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.list-enter-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
}

.list-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}

.list-move {
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-up-enter-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0.3s;
}

.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(40px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.form-section {
  opacity: 0;
  animation: fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.form-section:nth-child(1) { animation-delay: 0.1s; }
.form-section:nth-child(2) { animation-delay: 0.15s; }
.form-section:nth-child(3) { animation-delay: 0.2s; }
.form-section:nth-child(4) { animation-delay: 0.25s; }
.form-section:nth-child(5) { animation-delay: 0.3s; }
.form-section:nth-child(6) { animation-delay: 0.35s; }
.form-section:nth-child(7) { animation-delay: 0.4s; }
.form-section:nth-child(8) { animation-delay: 0.45s; }
.form-section:nth-child(9) { animation-delay: 0.5s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>