<template>
  <client-only>
    <n-select
        v-bind="$attrs"
        :value="props.modelValue"
        :options="props.options"
        @update:value="handleUpdate"
    >
      <template
          v-for="(_, name) in $slots"
          #[name]="slotData"
          :key="name"
      >
        <slot
            :name="name"
            v-bind="slotData || {}"
        />
      </template>
    </n-select>

    <template #fallback>
      <div
          class="h-[34px] w-full rounded-md border border-gray-200 bg-gray-50 animate-pulse"
      />
    </template>
  </client-only>
</template>

<script setup lang="ts">
import type {
  SelectOption
} from 'naive-ui'

defineOptions({
  inheritAttrs: false
})

const props = withDefaults(
    defineProps<{
      modelValue?: string | number | null
      options?: SelectOption[]
    }>(),
    {
      options: () => []
    }
)

const emit = defineEmits<{
  (
      e: 'update:modelValue',
      value: string | number | null
  ): void
}>()

const handleUpdate = (
    value: string | number | null
) => {
  emit('update:modelValue', value)
}
</script>
