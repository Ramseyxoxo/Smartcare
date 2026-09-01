<template>
  <div v-if="show" :class="alertClass" class="rounded-lg p-4 mb-4 flex items-start gap-3">
    <span class="text-xl">{{ icon }}</span>
    <div class="flex-1">
      <p v-if="title" class="font-semibold">{{ title }}</p>
      <p>{{ message }}</p>
    </div>
    <button @click="show = false" class="text-xl hover:opacity-70">✕</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'info', // info, success, warning, error
  },
  message: {
    type: String,
    required: true,
  },
  title: String,
  dismissible: {
    type: Boolean,
    default: true,
  },
})

const show = ref(true)

const alertClass = computed(() => {
  const baseClass = 'border-l-4'
  switch (props.type) {
    case 'success':
      return `${baseClass} bg-green-50 border-green-500 text-green-800`
    case 'warning':
      return `${baseClass} bg-yellow-50 border-yellow-500 text-yellow-800`
    case 'error':
      return `${baseClass} bg-red-50 border-red-500 text-red-800`
    default:
      return `${baseClass} bg-blue-50 border-blue-500 text-blue-800`
  }
})

const icon = computed(() => {
  switch (props.type) {
    case 'success':
      return '✓'
    case 'warning':
      return '⚠'
    case 'error':
      return '✕'
    default:
      return 'ℹ'
  }
})
</script>
