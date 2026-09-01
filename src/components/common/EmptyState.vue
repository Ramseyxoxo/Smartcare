<template>
  <div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="text-6xl mb-4">{{ icon }}</div>
    <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ title }}</h3>
    <p class="text-gray-600 mb-6">{{ message }}</p>
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'empty', // empty, error, notfound
  },
  title: String,
  message: String,
})

const icon = computed(() => {
  switch (props.type) {
    case 'error':
      return '❌'
    case 'notfound':
      return '🔍'
    default:
      return '📭'
  }
})

const defaultTitle = computed(() => {
  switch (props.type) {
    case 'error':
      return 'Something went wrong'
    case 'notfound':
      return 'Not found'
    default:
      return 'No data available'
  }
})

const defaultMessage = computed(() => {
  switch (props.type) {
    case 'error':
      return 'An error occurred. Please try again later.'
    case 'notfound':
      return 'The resource you are looking for does not exist.'
    default:
      return 'There is nothing to display here.'
  }
})
</script>
