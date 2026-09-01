<template>
  <button
    :type="type"
    :disabled="disabled || isLoading"
    :class="[
      'px-6 py-2 rounded-lg font-medium transition duration-200',
      variantClass,
      { 'opacity-50 cursor-not-allowed': disabled || isLoading },
    ]"
  >
    <span v-if="isLoading" class="loading-spinner mr-2"></span>
    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'button',
  },
  variant: {
    type: String,
    default: 'primary', // primary, secondary, danger
  },
  disabled: Boolean,
  isLoading: Boolean,
})

const variantClass = computed(() => {
  switch (props.variant) {
    case 'secondary':
      return 'bg-gray-200 text-gray-900 hover:bg-gray-300'
    case 'danger':
      return 'bg-red-600 text-white hover:bg-red-700'
    default:
      return 'bg-blue-600 text-white hover:bg-blue-700'
  }
})
</script>
