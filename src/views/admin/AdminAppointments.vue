<template>
  <DashboardLayout>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">All Appointments</h1>

      <Alert v-if="error" type="error" :message="error" />

      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <LoadingSpinner />
      </div>

      <div v-else>
        <!-- Filters -->
        <div class="bg-white rounded-lg shadow-md p-4 mb-6">
          <select v-model="filterStatus" class="input-field">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div
          v-if="filteredAppointments.length > 0"
          class="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <table class="w-full">
            <thead class="bg-gray-100 border-b">
              <tr>
                <th class="text-left px-6 py-4 font-semibold text-gray-900">Patient</th>
                <th class="text-left px-6 py-4 font-semibold text-gray-900">Doctor</th>
                <th class="text-left px-6 py-4 font-semibold text-gray-900">Department</th>
                <th class="text-left px-6 py-4 font-semibold text-gray-900">Date</th>
                <th class="text-left px-6 py-4 font-semibold text-gray-900">Time</th>
                <th class="text-left px-6 py-4 font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="apt in filteredAppointments"
                :key="apt.id"
                class="border-b hover:bg-gray-50 transition"
              >
                <td class="px-6 py-4">{{ apt.patient?.name }}</td>
                <td class="px-6 py-4">{{ apt.doctor?.name }}</td>
                <td class="px-6 py-4">{{ apt.doctor?.department?.name }}</td>
                <td class="px-6 py-4">{{ formatDate(apt.appointment_date) }}</td>
                <td class="px-6 py-4">{{ apt.appointment_time }}</td>
                <td class="px-6 py-4">
                  <span :class="getStatusBadge(apt.status)">
                    {{ apt.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <EmptyState v-else type="empty" title="No appointments" message="No appointments found." />
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Alert from '@/components/common/Alert.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { adminService } from '@/services/adminService.js'

const isLoading = ref(true)
const error = ref('')
const appointments = ref([])
const filterStatus = ref('')

const filteredAppointments = computed(() => {
  if (!filterStatus.value) return appointments.value
  return appointments.value.filter((apt) => apt.status === filterStatus.value)
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
    const data = await adminService.getAppointments()
    appointments.value = data.data || data
  } catch (err) {
    error.value = 'Failed to load appointments'
    console.error(err)
  } finally {
    isLoading.value = false
  }
})
</script>
