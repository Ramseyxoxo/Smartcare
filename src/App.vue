<template>
  <div class="min-h-screen bg-white">
    <RouterView />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth.js'

const authStore = useAuthStore()

onMounted(() => {
  // Initialize auth from localStorage on app mount
  authStore.initializeAuth()
})
</script>

<style scoped></style>
