<template>
  <div class="flex flex-col h-full">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200 p-6">
      <h1 class="text-3xl font-bold text-gray-900">SmartCare</h1>
      <p class="text-sm text-gray-600">Healthcare made simpler.</p>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto py-6">
      <div class="space-y-2">
        <!-- Common for all roles -->
        <RouterLink
          to="/dashboard"
          :class="
            isActive('/dashboard') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
          "
          class="block px-6 py-3 font-medium transition"
          @click="$emit('navigate')"
        >
          📊 Dashboard
        </RouterLink>

        <!-- Patient Navigation -->
        <template v-if="authStore.isPatient">
          <RouterLink
            to="/patient/appointments"
            :class="
              isActive('/patient/appointments')
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            "
            class="block px-6 py-3 font-medium transition"
            @click="$emit('navigate')"
          >
            📅 Appointments
          </RouterLink>
          <RouterLink
            to="/patient/doctors"
            :class="
              isActive('/patient/doctors')
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            "
            class="block px-6 py-3 font-medium transition"
            @click="$emit('navigate')"
          >
            👨‍⚕️ Doctors
          </RouterLink>
          <RouterLink
            to="/patient/medical-records"
            :class="
              isActive('/patient/medical-records')
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            "
            class="block px-6 py-3 font-medium transition"
            @click="$emit('navigate')"
          >
            📋 Medical Records
          </RouterLink>
          <RouterLink
            to="/patient/prescriptions"
            :class="
              isActive('/patient/prescriptions')
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            "
            class="block px-6 py-3 font-medium transition"
            @click="$emit('navigate')"
          >
            💊 Prescriptions
          </RouterLink>
        </template>

        <!-- Doctor Navigation -->
        <template v-if="authStore.isDoctor">
          <RouterLink
            to="/doctor/appointments"
            :class="
              isActive('/doctor/appointments')
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            "
            class="block px-6 py-3 font-medium transition"
            @click="$emit('navigate')"
          >
            📅 Appointments
          </RouterLink>
          <RouterLink
            to="/doctor/patients"
            :class="
              isActive('/doctor/patients')
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            "
            class="block px-6 py-3 font-medium transition"
            @click="$emit('navigate')"
          >
            👥 Patients
          </RouterLink>
          <RouterLink
            to="/doctor/medical-records"
            :class="
              isActive('/doctor/medical-records')
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            "
            class="block px-6 py-3 font-medium transition"
            @click="$emit('navigate')"
          >
            📋 Medical Records
          </RouterLink>
        </template>

        <!-- Admin Navigation -->
        <template v-if="authStore.isAdmin">
          <RouterLink
            to="/admin/users"
            :class="
              isActive('/admin/users')
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            "
            class="block px-6 py-3 font-medium transition"
            @click="$emit('navigate')"
          >
            👥 Users
          </RouterLink>
          <RouterLink
            to="/admin/doctors"
            :class="
              isActive('/admin/doctors')
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            "
            class="block px-6 py-3 font-medium transition"
            @click="$emit('navigate')"
          >
            👨‍⚕️ Doctors
          </RouterLink>
          <RouterLink
            to="/admin/patients"
            :class="
              isActive('/admin/patients')
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            "
            class="block px-6 py-3 font-medium transition"
            @click="$emit('navigate')"
          >
            👨‍🏥 Patients
          </RouterLink>
          <RouterLink
            to="/admin/departments"
            :class="
              isActive('/admin/departments')
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            "
            class="block px-6 py-3 font-medium transition"
            @click="$emit('navigate')"
          >
            🏥 Departments
          </RouterLink>
          <RouterLink
            to="/admin/appointments"
            :class="
              isActive('/admin/appointments')
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50'
            "
            class="block px-6 py-3 font-medium transition"
            @click="$emit('navigate')"
          >
            📅 Appointments
          </RouterLink>
        </template>

        <RouterLink
          to="/profile"
          :class="
            isActive('/profile') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
          "
          class="block px-6 py-3 font-medium transition"
          @click="$emit('navigate')"
        >
          👤 Profile
        </RouterLink>
      </div>
    </nav>

    <!-- Footer -->
    <div class="border-t border-gray-200 p-6">
      <button @click="handleLogout" class="w-full btn-danger">🚪 Logout</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

defineEmits(['navigate'])

const isActive = (path) => {
  return route.path.startsWith(path)
}

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>
