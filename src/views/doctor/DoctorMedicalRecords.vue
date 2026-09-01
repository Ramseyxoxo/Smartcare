<template>
  <DashboardLayout>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Medical Records</h1>
        <RouterLink to="/doctor/medical-records/create" class="btn-primary">
          ➕ Create Record
        </RouterLink>
      </div>

      <Alert v-if="error" type="error" :message="error" />

      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <LoadingSpinner />
      </div>

      <div v-else>
        <div v-if="records.length > 0" class="space-y-6">
          <div
            v-for="record in records"
            :key="record.id"
            class="card cursor-pointer hover:shadow-lg transition"
            @click="$router.push(`/doctor/medical-records/${record.id}`)"
          >
            <div class="flex items-start justify-between mb-4">
              <div>
                <h3 class="text-lg font-bold text-gray-900">{{ record.patient?.name }}</h3>
                <p class="text-sm text-gray-600">{{ formatDate(record.created_at) }}</p>
              </div>
              <span class="badge-primary">{{ record.diagnosis }}</span>
            </div>

            <p class="text-gray-700 line-clamp-3">{{ record.notes }}</p>

            <div class="mt-4 pt-4 border-t flex justify-between">
              <span v-if="record.prescriptions?.length" class="text-sm text-gray-600">
                {{ record.prescriptions.length }} prescription(s)
              </span>
              <button
                @click.stop="$router.push(`/doctor/medical-records/${record.id}`)"
                class="text-blue-600 hover:text-blue-700 font-semibold text-sm"
              >
                View Details →
              </button>
            </div>
          </div>
        </div>

        <EmptyState
          v-else
          type="empty"
          title="No medical records"
          message="You haven't created any medical records yet."
        >
          <RouterLink to="/doctor/medical-records/create" class="btn-primary inline-block">
            Create your first record
          </RouterLink>
        </EmptyState>
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
    const data = await doctorService.getMedicalRecords()
    records.value = data.data || data
  } catch (err) {
    error.value = 'Failed to load medical records'
    console.error(err)
  } finally {
    isLoading.value = false
  }
})
</script>
