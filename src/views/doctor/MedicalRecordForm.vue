<template>
  <DashboardLayout>
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">
        {{ isEditing ? 'Edit' : 'Create' }} Medical Record
      </h1>

      <Alert v-if="error" type="error" :message="error" />

      <Alert v-if="successMessage" type="success" :message="successMessage" />

      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <LoadingSpinner />
      </div>

      <div v-else class="bg-white rounded-lg shadow-md p-8">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <SelectField
            v-model="form.patient_id"
            name="patient_id"
            label="Patient"
            placeholder="Select a patient"
            required
            :error="errors.patient_id"
            :options="patientOptions"
            :disabled="isEditing"
          />

          <InputField
            v-model="form.diagnosis"
            name="diagnosis"
            label="Diagnosis"
            placeholder="Patient's diagnosis"
            required
            :error="errors.diagnosis"
          />

          <TextAreaField
            v-model="form.notes"
            name="notes"
            label="Consultation Notes"
            placeholder="Write your consultation notes..."
            required
            :error="errors.notes"
          />

          <div class="flex gap-4">
            <Button
              type="submit"
              variant="primary"
              :is-loading="isSubmitting"
              :disabled="isSubmitting"
              class="flex-1"
            >
              {{ isSubmitting ? 'Saving...' : 'Save Record' }}
            </Button>
            <RouterLink to="/doctor/medical-records" class="btn-secondary flex-1 text-center py-2">
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
import { useRoute, useRouter } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Alert from '@/components/common/Alert.vue'
import InputField from '@/components/common/InputField.vue'
import SelectField from '@/components/common/SelectField.vue'
import TextAreaField from '@/components/common/TextAreaField.vue'
import Button from '@/components/common/Button.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import { doctorService } from '@/services/doctorService.js'

const route = useRoute()
const router = useRouter()

const isEditing = computed(() => !!route.params.id)

const form = ref({
  patient_id: '',
  diagnosis: '',
  notes: '',
})

const errors = ref({})
const error = ref('')
const successMessage = ref('')
const isLoading = ref(true)
const isSubmitting = ref(false)
const patients = ref([])

const patientOptions = computed(() => {
  return patients.value.map((p) => ({
    value: p.id,
    label: p.name,
  }))
})

const handleSubmit = async () => {
  errors.value = {}
  error.value = ''

  if (!form.value.patient_id) errors.value.patient_id = 'Patient is required'
  if (!form.value.diagnosis) errors.value.diagnosis = 'Diagnosis is required'
  if (!form.value.notes) errors.value.notes = 'Notes are required'

  if (Object.keys(errors.value).length > 0) return

  isSubmitting.value = true
  try {
    if (isEditing.value) {
      await doctorService.updateMedicalRecord(route.params.id, form.value)
    } else {
      await doctorService.createMedicalRecord(form.value)
    }

    successMessage.value = isEditing.value
      ? 'Record updated successfully!'
      : 'Record created successfully!'
    setTimeout(() => {
      router.push('/doctor/medical-records')
    }, 2000)
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to save record'
  } finally {
    isSubmitting.value = false
  }
}

onMounted(async () => {
  try {
    const patients_data = await doctorService.getPatients()
    patients.value = patients_data.data || patients_data

    if (isEditing.value) {
      const data = await doctorService.getMedicalRecord(route.params.id)
      const record = data.data || data
      form.value = {
        patient_id: record.patient_id,
        diagnosis: record.diagnosis,
        notes: record.notes,
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
