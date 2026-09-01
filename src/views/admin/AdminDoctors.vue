<template>
  <DashboardLayout>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Doctors</h1>
        <RouterLink to="/admin/doctors/create" class="btn-primary"> ➕ Add Doctor </RouterLink>
      </div>

      <Alert v-if="error" type="error" :message="error" />

      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <LoadingSpinner />
      </div>

      <div v-else>
        <div v-if="doctors.length > 0" class="bg-white rounded-lg shadow-md overflow-hidden">
          <table class="w-full">
            <thead class="bg-gray-100 border-b">
              <tr>
                <th class="text-left px-6 py-4 font-semibold text-gray-900">Name</th>
                <th class="text-left px-6 py-4 font-semibold text-gray-900">Specialization</th>
                <th class="text-left px-6 py-4 font-semibold text-gray-900">Department</th>
                <th class="text-left px-6 py-4 font-semibold text-gray-900">Phone</th>
                <th class="text-left px-6 py-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="doctor in doctors"
                :key="doctor.id"
                class="border-b hover:bg-gray-50 transition"
              >
                <td class="px-6 py-4">{{ doctor.name }}</td>
                <td class="px-6 py-4">{{ doctor.specialization }}</td>
                <td class="px-6 py-4">{{ doctor.department?.name }}</td>
                <td class="px-6 py-4">{{ doctor.phone }}</td>
                <td class="px-6 py-4">
                  <div class="flex gap-2">
                    <RouterLink
                      :to="`/admin/doctors/${doctor.id}/edit`"
                      class="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                    >
                      Edit
                    </RouterLink>
                    <button
                      @click="deleteDoctor(doctor.id)"
                      class="text-red-600 hover:text-red-700 font-semibold text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <EmptyState
          v-else
          type="empty"
          title="No doctors"
          message="No doctors have been added yet."
        >
          <RouterLink to="/admin/doctors/create" class="btn-primary inline-block">
            Add your first doctor
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
import { adminService } from '@/services/adminService.js'

const isLoading = ref(true)
const error = ref('')
const doctors = ref([])

const deleteDoctor = async (id) => {
  if (!confirm('Are you sure you want to delete this doctor?')) return

  try {
    await adminService.deleteDoctor(id)
    doctors.value = doctors.value.filter((d) => d.id !== id)
  } catch (err) {
    error.value = 'Failed to delete doctor'
  }
}

onMounted(async () => {
  try {
    const data = await adminService.getDoctors()
    doctors.value = data.data || data
  } catch (err) {
    error.value = 'Failed to load doctors'
    console.error(err)
  } finally {
    isLoading.value = false
  }
})
</script>
