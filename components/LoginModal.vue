<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const activeTab = ref<'email' | 'wechat'>('email')
const isRegister = ref(false)
const email = ref('')
const password = ref('')
const nickname = ref('')

const handleLogin = () => {
  if (email.value && password.value) {
    emit('close')
  }
}

const handleRegister = () => {
  if (email.value && password.value && nickname.value) {
    emit('close')
  }
}

const switchToRegister = () => {
  isRegister.value = true
}

const switchToLogin = () => {
  isRegister.value = false
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="modal-overlay" @click.self="emit('close')">
        <div class="modal-content">
          <!-- 关闭按钮 -->
          <button class="close-btn" @click="emit('close')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-4 h-4">
              <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <!-- 标题区域 -->
          <div class="login-header">
            <div class="logo-wrapper">
              <div class="flex h-11 w-11 items-center justify-center rounded-xl text-lg font-bold text-white shadow-md" :style="{ background: `linear-gradient(135deg, var(--theme-color-400), var(--theme-color-600))` }">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
            </div>
            <h3 class="app-name">博客空间</h3>
            <p class="app-desc">{{ isRegister ? '创建新账户，开启您的博客之旅' : '欢迎回来，请登录您的账户' }}</p>
          </div>

          <!-- 标签切换 -->
          <div class="tabs" v-if="!isRegister">
            <button 
              class="tab-btn" 
              :class="{ active: activeTab === 'email' }"
              @click="activeTab = 'email'"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-4 h-4">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <span>邮箱登录</span>
            </button>
            <button 
              class="tab-btn" 
              :class="{ active: activeTab === 'wechat' }"
              @click="activeTab = 'wechat'"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--theme-color)" stroke-width="1.5" class="w-4 h-4">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M7 12h10M7 8h10"/>
              </svg>
              <span>微信登录</span>
            </button>
          </div>
          <div class="tabs" v-else>
            <button 
              class="tab-btn" 
              :class="{ active: !isRegister }"
              @click="switchToLogin"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-4 h-4">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <span>登 录</span>
            </button>
            <button 
              class="tab-btn" 
              :class="{ active: isRegister }"
              @click="switchToRegister"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-4 h-4">
                <path d="M12 4v16m8-8H4"/>
              </svg>
              <span>注 册</span>
            </button>
          </div>

          <!-- 表单区域 -->
          <Transition name="fade" mode="out-in">
            <div v-if="!isRegister && activeTab === 'email'" key="email" class="email-form">
              <div class="form-group">
                <label class="form-label">邮箱</label>
                <div class="input-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-4 h-4 input-icon">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <input 
                    v-model="email"
                    type="email" 
                    placeholder="请输入邮箱" 
                    class="form-input"
                    @keyup.enter="handleLogin"
                  />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">密码</label>
                <div class="input-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-4 h-4 input-icon">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                  <input 
                    v-model="password"
                    type="password" 
                    placeholder="请输入密码" 
                    class="form-input"
                    @keyup.enter="handleLogin"
                  />
                </div>
              </div>

              <button class="submit-btn" @click="handleLogin">
                <span>登 录</span>
              </button>

              <div class="form-footer">
                <a href="#" class="forgot-link">忘记密码？</a>
                <a href="#" class="register-link" @click.prevent="switchToRegister">注册账号</a>
              </div>
            </div>

            <!-- 微信登录 -->
            <div v-else-if="!isRegister && activeTab === 'wechat'" key="wechat" class="wechat-form">
              <div class="qr-code-wrapper">
                <div class="qr-code">
                  <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://example.com/login" 
                    alt="微信登录二维码"
                    class="qr-image"
                  />
                </div>
                <p class="qr-tip">使用微信扫码登录</p>
              </div>
            </div>

            <!-- 注册表单 -->
            <div v-else key="register" class="email-form">
              <div class="form-group">
                <label class="form-label">邮箱</label>
                <div class="input-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-4 h-4 input-icon">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <input 
                    v-model="email"
                    type="email" 
                    placeholder="请输入邮箱账号" 
                    class="form-input"
                    @keyup.enter="handleRegister"
                  />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">密码</label>
                <div class="input-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-4 h-4 input-icon">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                  <input 
                    v-model="password"
                    type="password" 
                    placeholder="请输入密码" 
                    class="form-input"
                    @keyup.enter="handleRegister"
                  />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">昵称</label>
                <div class="input-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="w-4 h-4 input-icon">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <input 
                    v-model="nickname"
                    type="text" 
                    placeholder="请输入昵称" 
                    class="form-input"
                    @keyup.enter="handleRegister"
                  />
                </div>
              </div>

              <button class="submit-btn" @click="handleRegister">
                <span>注 册</span>
              </button>

              <div class="form-footer">
                <span class="forgot-link">已有账号？</span>
                <a href="#" class="register-link" @click.prevent="switchToLogin">立即登录</a>
              </div>
            </div>
          </Transition>

          <!-- 协议提示 -->
          <div class="agreement-section">
            <div class="agreement-checkbox">
              <svg viewBox="0 0 24 24" fill="var(--theme-color)" stroke="var(--theme-color)" stroke-width="2" class="w-4 h-4">
                <circle cx="12" cy="12" r="10" fill="none"/>
                <path d="M9 12l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <span class="agreement-text">
              登录即同意
              <a href="#" class="hover:opacity-80 transition-opacity">用户协议</a>
              和
              <a href="#" class="hover:opacity-80 transition-opacity">隐私政策</a>
            </span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
}

.modal-content {
  position: relative;
  width: 360px;
  background: #ffffff;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(0, 0, 0, 0.05);
}

.close-btn {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 30px;
  height: 30px;
  border: none;
  background: #f5f7fa;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #e5e7eb;
  color: #374151;
}

.login-header {
  text-align: center;
  margin-bottom: 24px;
}

.logo-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
}

.app-name {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 4px 0;
}

.app-desc {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  padding: 4px;
  background: #f5f7fa;
  border-radius: 10px;
}

.tab-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 40px;
  border: none;
  background: transparent;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tab-btn.active {
  background: #ffffff;
  color: var(--theme-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.tab-btn:hover:not(.active) {
  color: #374151;
}

.email-form {
  margin-bottom: 16px;
}

.form-group {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
}

.form-input {
  width: 100%;
  height: 44px;
  padding: 0 14px 0 44px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  font-size: 14px;
  color: #1f2937;
  background: #fafafa;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: var(--theme-color);
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(var(--theme-color-rgb), 0.1);
}

.form-input::placeholder {
  color: #9ca3af;
}

.submit-btn {
  width: 100%;
  height: 44px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--theme-color-400), var(--theme-color-600));
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(var(--theme-color-rgb), 0.3);
}

.submit-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(var(--theme-color-rgb), 0.35);
}

.submit-btn:active {
  transform: translateY(0);
}

.form-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 14px;
}

.forgot-link,
.register-link {
  font-size: 13px;
  color: #6b7280;
  text-decoration: none;
  transition: color 0.2s ease;
}

.forgot-link:hover,
.register-link:hover {
  color: var(--theme-color);
}

.wechat-form {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.qr-code-wrapper {
  text-align: center;
}

.qr-code {
  width: 160px;
  height: 160px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.qr-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.qr-tip {
  margin-top: 14px;
  font-size: 14px;
  color: #6b7280;
}

.agreement-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.agreement-checkbox {
  display: flex;
  align-items: center;
}

.agreement-text {
  font-size: 12px;
  color: #9ca3af;
}

.agreement-text a {
  font-weight: 500;
  text-decoration: none;
  color: var(--theme-color);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.modal-enter-from .modal-content {
  transform: scale(0.96) translateY(10px);
  opacity: 0;
}

.modal-leave-to .modal-content {
  transform: scale(0.96);
  opacity: 0;
}
</style>
