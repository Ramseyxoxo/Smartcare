<template>
  <div class="flex items-center justify-center py-8">
    <div class="flex flex-col items-center gap-4">
      <div class="loading-spinner"></div>
      <p class="text-gray-600">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    default: 'Loading...',
  },
})
</script>
