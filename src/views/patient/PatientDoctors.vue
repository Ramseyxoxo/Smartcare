<template>
  <DashboardLayout>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Find Doctors</h1>

      <Alert v-if="error" type="error" :message="error" />

      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <LoadingSpinner />
      </div>

      <div v-else class="space-y-6">
        <!-- Filters -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">Filter Doctors</h2>
          <div class="grid md:grid-cols-2 gap-4">
            <SelectField
              v-model="filterDepartment"
              name="department"
              label="Department"
              placeholder="Select department"
              :options="departmentOptions"
            />
            <InputField
              v-model="searchQuery"
              name="search"
              label="Search by name"
              placeholder="Search doctor name..."
            />
          </div>
        </div>

        <!-- Doctors Grid -->
        <div v-if="filteredDoctors.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="doctor in filteredDoctors"
            :key="doctor.id"
            class="card cursor-pointer hover:shadow-lg transition"
            @click="selectDoctor(doctor)"
          >
            <div class="text-center mb-4">
              <div class="text-5xl mb-3">👨‍⚕️</div>
              <h3 class="text-xl font-bold text-gray-900">{{ doctor.name }}</h3>
            </div>

            <div class="space-y-3 text-sm">
              <div>
                <p class="text-gray-600">Specialization</p>
                <p class="font-semibold text-gray-900">{{ doctor.specialization }}</p>
              </div>

              <div>
                <p class="text-gray-600">Department</p>
                <p class="font-semibold text-gray-900">{{ doctor.department?.name }}</p>
              </div>

              <div v-if="doctor.phone">
                <p class="text-gray-600">Phone</p>
                <p class="font-semibold text-gray-900">{{ doctor.phone }}</p>
              </div>

              <div v-if="doctor.availability">
                <p class="text-gray-600">Availability</p>
                <p class="font-semibold text-gray-900">{{ doctor.availability }}</p>
              </div>
            </div>

            <RouterLink
              :to="`/patient/appointments/book?doctor=${doctor.id}`"
              class="btn-primary w-full text-center mt-4"
            >
              📅 Book Appointment
            </RouterLink>
          </div>
        </div>

        <EmptyState
          v-else
          type="notfound"
          title="No doctors found"
          message="Try adjusting your filters."
        />
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
import SelectField from '@/components/common/SelectField.vue'
import InputField from '@/components/common/InputField.vue'
import { patientService } from '@/services/patientService.js'

const isLoading = ref(true)
const error = ref('')
const doctors = ref([])
const departments = ref([])
const filterDepartment = ref('')
const searchQuery = ref('')

const departmentOptions = computed(() => {
  return departments.value.map((dept) => ({
    value: dept.id,
    label: dept.name,
  }))
})

const filteredDoctors = computed(() => {
  return doctors.value.filter((doctor) => {
    const matchDept = !filterDepartment.value || doctor.department?.id == filterDepartment.value
    const matchSearch =
      !searchQuery.value || doctor.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchDept && matchSearch
  })
})

const selectDoctor = (doctor) => {
  // Doctor selection is handled by the book appointment button
}

onMounted(async () => {
  try {
    const [doctorsData, deptData] = await Promise.all([
      patientService.getDoctors(),
      patientService.getDepartments(),
    ])

    doctors.value = doctorsData.data || doctorsData
    departments.value = deptData.data || deptData
  } catch (err) {
    error.value = 'Failed to load doctors'
    console.error(err)
  } finally {
    isLoading.value = false
  }
})
</script>
