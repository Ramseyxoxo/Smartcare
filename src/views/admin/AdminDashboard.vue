<template>
  <DashboardLayout>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      <Alert v-if="error" type="error" :message="error" />

      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <LoadingSpinner />
      </div>

      <div v-else class="space-y-8">
        <!-- Quick Stats -->
        <div class="grid md:grid-cols-5 gap-4">
          <Card>
            <div class="text-center">
              <div class="text-4xl mb-2">👥</div>
              <p class="text-gray-600 text-sm">Total Patients</p>
              <p class="text-3xl font-bold text-blue-600">{{ stats.patients }}</p>
            </div>
          </Card>

          <Card>
            <div class="text-center">
              <div class="text-4xl mb-2">👨‍⚕️</div>
              <p class="text-gray-600 text-sm">Total Doctors</p>
              <p class="text-3xl font-bold text-purple-600">{{ stats.doctors }}</p>
            </div>
          </Card>

          <Card>
            <div class="text-center">
              <div class="text-4xl mb-2">🏥</div>
              <p class="text-gray-600 text-sm">Departments</p>
              <p class="text-3xl font-bold text-green-600">{{ stats.departments }}</p>
            </div>
          </Card>

          <Card>
            <div class="text-center">
              <div class="text-4xl mb-2">📅</div>
              <p class="text-gray-600 text-sm">Total Appointments</p>
              <p class="text-3xl font-bold text-yellow-600">{{ stats.total_appointments }}</p>
            </div>
          </Card>

          <Card>
            <div class="text-center">
              <div class="text-4xl mb-2">✓</div>
              <p class="text-gray-600 text-sm">Completed</p>
              <p class="text-3xl font-bold text-green-600">{{ stats.completed }}</p>
            </div>
          </Card>
        </div>

        <!-- More Stats -->
        <div class="grid md:grid-cols-3 gap-6">
          <Card>
            <h3 class="font-bold text-gray-900 mb-2">⏳ Pending Appointments</h3>
            <p class="text-3xl font-bold text-yellow-600">{{ stats.pending }}</p>
          </Card>

          <Card>
            <h3 class="font-bold text-gray-900 mb-2">✓ Confirmed Appointments</h3>
            <p class="text-3xl font-bold text-green-600">{{ stats.confirmed }}</p>
          </Card>

          <Card>
            <h3 class="font-bold text-gray-900 mb-2">❌ Cancelled Appointments</h3>
            <p class="text-3xl font-bold text-red-600">{{ stats.cancelled }}</p>
          </Card>
        </div>

        <!-- Quick Actions -->
        <Card>
          <h2 class="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div class="grid md:grid-cols-5 gap-4">
            <RouterLink to="/admin/users" class="btn-primary text-center py-3">
              👥 Users
            </RouterLink>
            <RouterLink to="/admin/doctors" class="btn-secondary text-center py-3">
              👨‍⚕️ Doctors
            </RouterLink>
            <RouterLink to="/admin/patients" class="btn-secondary text-center py-3">
              👨‍🏥 Patients
            </RouterLink>
            <RouterLink to="/admin/departments" class="btn-secondary text-center py-3">
              🏥 Departments
            </RouterLink>
            <RouterLink to="/admin/appointments" class="btn-secondary text-center py-3">
              📅 Appointments
            </RouterLink>
          </div>
        </Card>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Card from '@/components/common/Card.vue'
import Alert from '@/components/common/Alert.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import { adminService } from '@/services/adminService.js'

const isLoading = ref(true)
const error = ref('')

const stats = ref({
  patients: 0,
  doctors: 0,
  departments: 0,
  total_appointments: 0,
  pending: 0,
  confirmed: 0,
  completed: 0,
  cancelled: 0,
})

onMounted(async () => {
  try {
    const data = await adminService.getDashboard()
    stats.value = data.data || data
  } catch (err) {
    error.value = 'Failed to load dashboard'
    console.error(err)
  } finally {
    isLoading.value = false
  }
})
</script>
