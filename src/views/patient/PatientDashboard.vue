<template>
  <DashboardLayout>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Patient Dashboard</h1>

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
              <p class="text-gray-600 text-sm">Upcoming Appointments</p>
              <p class="text-3xl font-bold text-blue-600">{{ stats.upcoming }}</p>
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
              <div class="text-4xl mb-2">⏳</div>
              <p class="text-gray-600 text-sm">Pending Appointments</p>
              <p class="text-3xl font-bold text-yellow-600">{{ stats.pending }}</p>
            </div>
          </Card>

          <Card>
            <div class="text-center">
              <div class="text-4xl mb-2">📋</div>
              <p class="text-gray-600 text-sm">Medical Records</p>
              <p class="text-3xl font-bold text-purple-600">{{ stats.records }}</p>
            </div>
          </Card>
        </div>

        <!-- Next Appointment -->
        <Card v-if="nextAppointment">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Next Appointment</h2>
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm text-gray-600">Doctor</p>
              <p class="font-semibold text-gray-900">{{ nextAppointment.doctor?.name }}</p>
              <p class="text-sm text-gray-600 mt-4">Date & Time</p>
              <p class="font-semibold text-gray-900">
                {{ formatDate(nextAppointment.appointment_date) }} at
                {{ nextAppointment.appointment_time }}
              </p>
              <p class="text-sm text-gray-600 mt-4">Reason</p>
              <p class="text-gray-900">{{ nextAppointment.reason }}</p>
            </div>
            <span :class="getStatusBadge(nextAppointment.status)">
              {{ nextAppointment.status }}
            </span>
          </div>
        </Card>

        <!-- Quick Actions -->
        <Card>
          <h2 class="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div class="grid md:grid-cols-3 gap-4">
            <RouterLink to="/patient/appointments/book" class="btn-primary text-center py-3">
              📅 Book Appointment
            </RouterLink>
            <RouterLink to="/patient/doctors" class="btn-secondary text-center py-3">
              👨‍⚕️ Find Doctors
            </RouterLink>
            <RouterLink to="/patient/medical-records" class="btn-secondary text-center py-3">
              📋 View Medical Records
            </RouterLink>
          </div>
        </Card>

        <!-- Recent Appointments -->
        <Card v-if="recentAppointments.length > 0">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Recent Appointments</h2>
          <div class="space-y-3">
            <div
              v-for="apt in recentAppointments.slice(0, 3)"
              :key="apt.id"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p class="font-semibold text-gray-900">{{ apt.doctor?.name }}</p>
                <p class="text-sm text-gray-600">{{ formatDate(apt.appointment_date) }}</p>
              </div>
              <span :class="getStatusBadge(apt.status)">
                {{ apt.status }}
              </span>
            </div>
          </div>
          <RouterLink
            to="/patient/appointments"
            class="text-blue-600 hover:text-blue-700 font-semibold mt-4 block"
          >
            View all appointments →
          </RouterLink>
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
import { patientService } from '@/services/patientService.js'

const isLoading = ref(true)
const error = ref('')
const appointments = ref([])

const stats = ref({
  upcoming: 0,
  completed: 0,
  pending: 0,
  records: 0,
})

const nextAppointment = computed(() => {
  return appointments.value.find((apt) => apt.status === 'confirmed') || appointments.value[0]
})

const recentAppointments = computed(() => {
  return appointments.value.slice(0, 5)
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

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
      patientService.getDashboard(),
      patientService.getAppointments(),
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
