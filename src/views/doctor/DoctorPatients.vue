<template>
  <DashboardLayout>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">My Patients</h1>

      <Alert v-if="error" type="error" :message="error" />

      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <LoadingSpinner />
      </div>

      <div v-else>
        <div v-if="patients.length > 0" class="bg-white rounded-lg shadow-md overflow-hidden">
          <table class="w-full">
            <thead class="bg-gray-100 border-b">
              <tr>
                <th class="text-left px-6 py-4 font-semibold text-gray-900">Patient Name</th>
                <th class="text-left px-6 py-4 font-semibold text-gray-900">Phone</th>
                <th class="text-left px-6 py-4 font-semibold text-gray-900">Date of Birth</th>
                <th class="text-left px-6 py-4 font-semibold text-gray-900">Gender</th>
                <th class="text-left px-6 py-4 font-semibold text-gray-900">Last Appointment</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="patient in patients"
                :key="patient.id"
                class="border-b hover:bg-gray-50 transition"
              >
                <td class="px-6 py-4">{{ patient.name }}</td>
                <td class="px-6 py-4">{{ patient.phone }}</td>
                <td class="px-6 py-4">{{ formatDate(patient.date_of_birth) }}</td>
                <td class="px-6 py-4 capitalize">{{ patient.gender }}</td>
                <td class="px-6 py-4">
                  {{ patient.last_appointment ? formatDate(patient.last_appointment) : 'N/A' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <EmptyState
          v-else
          type="empty"
          title="No patients"
          message="You don't have any patients yet."
        />
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Alert from '@/components/common/Alert.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { doctorService } from '@/services/doctorService.js'

const isLoading = ref(true)
const error = ref('')
const patients = ref([])

const formatDate = (date) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

onMounted(async () => {
  try {
    const data = await doctorService.getPatients()
    patients.value = data.data || data
  } catch (err) {
    error.value = 'Failed to load patients'
    console.error(err)
  } finally {
    isLoading.value = false
  }
})
</script>
