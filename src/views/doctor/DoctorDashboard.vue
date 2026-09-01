<template>
  <DashboardLayout>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Doctor Dashboard</h1>

      <Alert v-if="error" type="error" :message="error" />

      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <LoadingSpinner />
      </div>

      <div v-else class="space-y-8">
        <!-- Quick Stats -->
        <div class="grid md:grid-cols-4 gap-6">
          <Card>
            <div class="text-center">
              <div class="text-4xl mb-2">📅</div>
              <p class="text-gray-600 text-sm">Today's Appointments</p>
              <p class="text-3xl font-bold text-blue-600">{{ stats.today }}</p>
            </div>
          </Card>

          <Card>
            <div class="text-center">
              <div class="text-4xl mb-2">⏳</div>
              <p class="text-gray-600 text-sm">Pending Appointments</p>
              <p class="text-3xl font-bold text-yellow-600">{{ stats.pending }}</p>
            </div>
          </Card>

          <Card>
            <div class="text-center">
              <div class="text-4xl mb-2">✓</div>
              <p class="text-gray-600 text-sm">Completed Appointments</p>
              <p class="text-3xl font-bold text-green-600">{{ stats.completed }}</p>
            </div>
          </Card>

          <Card>
            <div class="text-center">
              <div class="text-4xl mb-2">👥</div>
              <p class="text-gray-600 text-sm">Total Patients</p>
              <p class="text-3xl font-bold text-purple-600">{{ stats.patients }}</p>
            </div>
          </Card>
        </div>

        <!-- Today's Appointments -->
        <Card v-if="todayAppointments.length > 0">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Today's Appointments</h2>
          <div class="space-y-3">
            <div
              v-for="apt in todayAppointments"
              :key="apt.id"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p class="font-semibold text-gray-900">{{ apt.patient?.name }}</p>
                <p class="text-sm text-gray-600">{{ apt.appointment_time }}</p>
              </div>
              <span :class="getStatusBadge(apt.status)">
                {{ apt.status }}
              </span>
            </div>
          </div>
        </Card>

        <!-- Quick Actions -->
        <Card>
          <h2 class="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div class="grid md:grid-cols-3 gap-4">
            <RouterLink to="/doctor/appointments" class="btn-primary text-center py-3">
              📅 View Appointments
            </RouterLink>
            <RouterLink to="/doctor/medical-records" class="btn-secondary text-center py-3">
              📋 Medical Records
            </RouterLink>
            <RouterLink to="/doctor/patients" class="btn-secondary text-center py-3">
              👥 My Patients
            </RouterLink>
          </div>
        </Card>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Card from '@/components/common/Card.vue'
import Alert from '@/components/common/Alert.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import { doctorService } from '@/services/doctorService.js'

const isLoading = ref(true)
const error = ref('')
const appointments = ref([])

const stats = ref({
  today: 0,
  pending: 0,
  completed: 0,
  patients: 0,
})

const todayAppointments = computed(() => {
  const today = new Date().toISOString().split('T')[0]
  return appointments.value.filter((apt) => apt.appointment_date === today).slice(0, 5)
})

const getStatusBadge = (status) => {
  const badges = {
    pending: 'badge-warning',
    confirmed: 'badge-success',
    completed: 'badge-primary',
    cancelled: 'badge-danger',
  }
  return badges[status] || 'badge-primary'
}

onMounted(async () => {
  try {
    const [dashboardData, appointmentsData] = await Promise.all([
      doctorService.getDashboard(),
      doctorService.getAppointments(),
    ])

    appointments.value = appointmentsData.data || appointmentsData
    stats.value = dashboardData.data || dashboardData
  } catch (err) {
    error.value = 'Failed to load dashboard'
    console.error(err)
  } finally {
    isLoading.value = false
  }
})
</script>
