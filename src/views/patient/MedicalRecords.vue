<template>
  <DashboardLayout>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Medical Records</h1>

      <Alert v-if="error" type="error" :message="error" />

      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <LoadingSpinner />
      </div>

      <div v-else>
        <div v-if="records.length > 0" class="space-y-6">
          <div v-for="record in records" :key="record.id" class="card">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="text-lg font-bold text-gray-900">{{ record.doctor?.name }}</h3>
                <p class="text-sm text-gray-600">{{ formatDate(record.created_at) }}</p>
              </div>
              <span class="badge-primary">{{ record.diagnosis }}</span>
            </div>

            <div>
              <p class="text-gray-600 text-sm mb-1">Notes</p>
              <p class="text-gray-900">{{ record.notes }}</p>
            </div>

            <div
              v-if="record.prescriptions && record.prescriptions.length > 0"
              class="mt-4 pt-4 border-t"
            >
              <p class="font-semibold text-gray-900 mb-2">Prescriptions</p>
              <div class="space-y-2">
                <div v-for="rx in record.prescriptions" :key="rx.id" class="text-sm text-gray-700">
                  <p>{{ rx.medicine_name }} - {{ rx.dosage }}</p>
                  <p class="text-gray-600">{{ rx.frequency }} for {{ rx.duration }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <EmptyState
          v-else
          type="empty"
          title="No medical records"
          message="Your medical records will appear here after doctor consultations."
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
import { patientService } from '@/services/patientService.js'

const isLoading = ref(true)
const error = ref('')
const records = ref([])

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

onMounted(async () => {
  try {
    const data = await patientService.getMedicalRecords()
    records.value = data.data || data
  } catch (err) {
    error.value = 'Failed to load medical records'
    console.error(err)
  } finally {
    isLoading.value = false
  }
})
</script>
