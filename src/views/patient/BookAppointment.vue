<template>
  <DashboardLayout>
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Book Appointment</h1>

      <Alert v-if="error" type="error" :message="error" />

      <Alert v-if="successMessage" type="success" :message="successMessage" />

      <div class="bg-white rounded-lg shadow-md p-8">
        <form @submit.prevent="handleBook" class="space-y-6">
          <SelectField
            v-model="form.department_id"
            name="department_id"
            label="Department"
            placeholder="Select a department"
            required
            :error="errors.department_id"
            :options="departmentOptions"
            @update:model-value="onDepartmentChange"
          />

          <SelectField
            v-model="form.doctor_id"
            name="doctor_id"
            label="Doctor"
            placeholder="Select a doctor"
            required
            :error="errors.doctor_id"
            :options="doctorOptions"
          />

          <InputField
            v-model="form.appointment_date"
            name="appointment_date"
            label="Appointment Date"
            type="date"
            required
            :error="errors.appointment_date"
          />

          <InputField
            v-model="form.appointment_time"
            name="appointment_time"
            label="Appointment Time"
            type="time"
            required
            :error="errors.appointment_time"
          />

          <TextAreaField
            v-model="form.reason"
            name="reason"
            label="Reason for Appointment"
            placeholder="Describe your symptoms or reason for visit..."
            required
            :error="errors.reason"
          />

          <div class="flex gap-4">
            <Button
              type="submit"
              variant="primary"
              :is-loading="isLoading"
              :disabled="isLoading"
              class="flex-1"
            >
              {{ isLoading ? 'Booking...' : 'Book Appointment' }}
            </Button>
            <RouterLink to="/patient/appointments" class="btn-secondary flex-1 text-center py-2">
              Cancel
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Alert from '@/components/common/Alert.vue'
import InputField from '@/components/common/InputField.vue'
import SelectField from '@/components/common/SelectField.vue'
import TextAreaField from '@/components/common/TextAreaField.vue'
import Button from '@/components/common/Button.vue'
import { patientService } from '@/services/patientService.js'

const router = useRouter()
const route = useRoute()

const form = ref({
  department_id: '',
  doctor_id: '',
  appointment_date: '',
  appointment_time: '',
  reason: '',
})

const errors = ref({})
const error = ref('')
const successMessage = ref('')
const isLoading = ref(true)
const departments = ref([])
const doctors = ref([])
const isSubmitting = ref(false)

const departmentOptions = computed(() => {
  return departments.value.map((dept) => ({
    value: dept.id,
    label: dept.name,
  }))
})

const doctorOptions = computed(() => {
  if (!form.value.department_id) return []
  return doctors.value
    .filter((doc) => doc.department?.id == form.value.department_id)
    .map((doc) => ({
      value: doc.id,
      label: `${doc.name} (${doc.specialization})`,
    }))
})

const onDepartmentChange = () => {
  form.value.doctor_id = ''
  errors.value.doctor_id = ''
}

const handleBook = async () => {
  errors.value = {}
  error.value = ''

  if (!form.value.department_id) errors.value.department_id = 'Department is required'
  if (!form.value.doctor_id) errors.value.doctor_id = 'Doctor is required'
  if (!form.value.appointment_date) errors.value.appointment_date = 'Date is required'
  if (!form.value.appointment_time) errors.value.appointment_time = 'Time is required'
  if (!form.value.reason) errors.value.reason = 'Reason is required'

  if (Object.keys(errors.value).length > 0) return

  isSubmitting.value = true
  try {
    await patientService.bookAppointment({
      department_id: form.value.department_id,
      doctor_id: form.value.doctor_id,
      appointment_date: form.value.appointment_date,
      appointment_time: form.value.appointment_time,
      reason: form.value.reason,
    })

    successMessage.value = 'Appointment booked successfully!'
    setTimeout(() => {
      router.push('/patient/appointments')
    }, 2000)
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to book appointment'
  } finally {
    isSubmitting.value = false
  }
}

onMounted(async () => {
  try {
    const [deptData, doctorsData] = await Promise.all([
      patientService.getDepartments(),
      patientService.getDoctors(),
    ])

    departments.value = deptData.data || deptData
    doctors.value = doctorsData.data || doctorsData

    // Pre-fill doctor if passed in query
    if (route.query.doctor) {
      form.value.doctor_id = route.query.doctor
      const selectedDoctor = doctors.value.find((d) => d.id == route.query.doctor)
      if (selectedDoctor) {
        form.value.department_id = selectedDoctor.department?.id
      }
    }
  } catch (err) {
    error.value = 'Failed to load form data'
    console.error(err)
  } finally {
    isLoading.value = false
  }
})
</script>
