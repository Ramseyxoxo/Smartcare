<template>
  <div class="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
    <div class="hidden md:block">
      <p class="text-sm text-gray-600">Welcome back,</p>
      <p class="font-semibold text-gray-900">{{ authStore.user?.name || 'User' }}</p>
    </div>

    <div class="flex items-center gap-4">
      <span
        class="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
      >
        {{ userRoleLabel }}
      </span>
      <button
        @click="toggleProfileMenu"
        class="text-3xl cursor-pointer hover:opacity-70 transition"
      >
        👤
      </button>
    </div>

    <!-- Profile menu -->
    <transition name="fade">
      <div v-if="profileMenuOpen" @click="toggleProfileMenu" class="fixed inset-0 z-40" />
    </transition>

    <div
      v-if="profileMenuOpen"
      class="absolute top-16 right-6 bg-white rounded-lg shadow-lg z-50 w-48 overflow-hidden"
    >
      <RouterLink
        to="/profile"
        class="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100"
        @click="profileMenuOpen = false"
      >
        👤 Profile
      </RouterLink>
      <button
        @click="handleLogout"
        class="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 font-medium"
      >
        🚪 Logout
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'

const router = useRouter()
const authStore = useAuthStore()
const profileMenuOpen = ref(false)

const userRoleLabel = computed(() => {
  if (authStore.isPatient) return 'Patient'
  if (authStore.isDoctor) return 'Doctor'
  if (authStore.isAdmin) return 'Admin'
  return 'User'
})

const toggleProfileMenu = () => {
  profileMenuOpen.value = !profileMenuOpen.value
}

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
