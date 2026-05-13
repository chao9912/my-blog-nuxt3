<script setup lang="ts">
import AppMainLayout from '@/components/layout/AppMainLayout.vue';
const { currentTheme } = useTheme()

const themeOverrides = computed(() => ({
  common: {
    primaryColor: currentTheme.value,
    primaryColorHover: currentTheme.value,
    primaryColorPressed: currentTheme.value
  }
}))
</script>

<template>
  <n-config-provider
      :theme-overrides="themeOverrides"
  >
    <AppMainLayout>
      <slot />
    </AppMainLayout>
  </n-config-provider>
</template>
