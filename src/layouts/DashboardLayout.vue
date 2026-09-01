<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <div v-if="!isMobile" class="w-64 bg-white shadow-lg flex flex-col">
      <DashboardSidebar />
    </div>

    <!-- Mobile menu button -->
    <button
      v-if="isMobile"
      @click="mobileMenuOpen = !mobileMenuOpen"
      class="fixed top-4 left-4 z-40 p-2 bg-blue-600 text-white rounded-lg"
    >
      ☰
    </button>

    <!-- Mobile sidebar overlay -->
    <transition name="fade">
      <div
        v-if="mobileMenuOpen && isMobile"
        @click="mobileMenuOpen = false"
        class="fixed inset-0 bg-black bg-opacity-50 z-30"
      />
    </transition>

    <!-- Mobile sidebar -->
    <div
      v-if="mobileMenuOpen && isMobile"
      class="fixed left-0 top-0 w-64 h-screen bg-white shadow-lg z-40 overflow-y-auto"
    >
      <DashboardSidebar @navigate="mobileMenuOpen = false" />
    </div>

    <!-- Main content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <DashboardTopNav />
      <main class="flex-1 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import DashboardSidebar from '@/components/layout/DashboardSidebar.vue'
import DashboardTopNav from '@/components/layout/DashboardTopNav.vue'

const mobileMenuOpen = ref(false)
const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
