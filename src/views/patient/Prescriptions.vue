<template>
  <DashboardLayout>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Prescriptions</h1>

      <Alert v-if="error" type="error" :message="error" />

      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <LoadingSpinner />
      </div>

      <div v-else>
        <div v-if="prescriptions.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="rx in prescriptions" :key="rx.id" class="card">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="text-lg font-bold text-gray-900">{{ rx.medicine_name }}</h3>
                <p class="text-sm text-gray-600">{{ formatDate(rx.date) }}</p>
              </div>
              <div class="text-2xl">💊</div>
            </div>

            <div class="space-y-3 text-sm">
              <div>
                <p class="text-gray-600">Dosage</p>
                <p class="font-semibold text-gray-900">{{ rx.dosage }}</p>
              </div>

              <div>
                <p class="text-gray-600">Frequency</p>
                <p class="font-semibold text-gray-900">{{ rx.frequency }}</p>
              </div>

              <div>
                <p class="text-gray-600">Duration</p>
                <p class="font-semibold text-gray-900">{{ rx.duration }}</p>
              </div>

              <div>
                <p class="text-gray-600">Instructions</p>
                <p class="font-semibold text-gray-900">{{ rx.instructions }}</p>
              </div>
            </div>
          </div>
        </div>

        <EmptyState
          v-else
          type="empty"
          title="No prescriptions"
          message="Your prescriptions will appear here after doctor consultations."
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
const prescriptions = ref([])

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

onMounted(async () => {
  try {
    const data = await patientService.getPrescriptions()
    prescriptions.value = data.data || data
  } catch (err) {
    error.value = 'Failed to load prescriptions'
    console.error(err)
  } finally {
    isLoading.value = false
  }
})
</script>
