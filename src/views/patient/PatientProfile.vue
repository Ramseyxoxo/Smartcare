<template>
  <DashboardLayout>
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

      <Alert v-if="error" type="error" :message="error" />

      <Alert v-if="successMessage" type="success" :message="successMessage" />

      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <LoadingSpinner />
      </div>

      <div v-else class="bg-white rounded-lg shadow-md p-8">
        <form @submit.prevent="handleUpdate" class="space-y-6">
          <InputField
            v-model="form.name"
            name="name"
            label="Full Name"
            required
            :error="errors.name"
          />

          <InputField
            v-model="form.email"
            name="email"
            label="Email Address"
            type="email"
            required
            :error="errors.email"
            disabled
          />

          <InputField
            v-model="form.phone"
            name="phone"
            label="Phone Number"
            type="tel"
            :error="errors.phone"
          />

          <InputField
            v-model="form.date_of_birth"
            name="date_of_birth"
            label="Date of Birth"
            type="date"
            :error="errors.date_of_birth"
          />

          <SelectField
            v-model="form.gender"
            name="gender"
            label="Gender"
            :error="errors.gender"
            :options="[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Other' },
            ]"
          />

          <TextAreaField
            v-model="form.address"
            name="address"
            label="Address"
            :error="errors.address"
          />

          <InputField
            v-model="form.emergency_contact"
            name="emergency_contact"
            label="Emergency Contact"
            type="tel"
            :error="errors.emergency_contact"
          />

          <div class="flex gap-4">
            <Button
              type="submit"
              variant="primary"
              :is-loading="isSubmitting"
              :disabled="isSubmitting"
              class="flex-1"
            >
              {{ isSubmitting ? 'Saving...' : 'Save Changes' }}
            </Button>
            <RouterLink to="/patient/dashboard" class="btn-secondary flex-1 text-center py-2">
              Cancel
            </RouterLink>
          </div>
        </form>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import Alert from '@/components/common/Alert.vue'
import InputField from '@/components/common/InputField.vue'
import SelectField from '@/components/common/SelectField.vue'
import TextAreaField from '@/components/common/TextAreaField.vue'
import Button from '@/components/common/Button.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner.vue'
import { patientService } from '@/services/patientService.js'

const isLoading = ref(true)
const isSubmitting = ref(false)
const error = ref('')
const successMessage = ref('')
const errors = ref({})

const form = ref({
  name: '',
  email: '',
  phone: '',
  date_of_birth: '',
  gender: '',
  address: '',
  emergency_contact: '',
})

const handleUpdate = async () => {
  errors.value = {}
  error.value = ''

  if (!form.value.name) errors.value.name = 'Name is required'

  if (Object.keys(errors.value).length > 0) return

  isSubmitting.value = true
  try {
    await patientService.updateProfile(form.value)
    successMessage.value = 'Profile updated successfully!'
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to update profile'
  } finally {
    isSubmitting.value = false
  }
}

onMounted(async () => {
  try {
    const data = await patientService.getProfile()
    const profile = data.data || data
    form.value = {
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      date_of_birth: profile.date_of_birth,
      gender: profile.gender,
      address: profile.address,
      emergency_contact: profile.emergency_contact,
    }
  } catch (err) {
    error.value = 'Failed to load profile'
    console.error(err)
  } finally {
    isLoading.value = false
  }
})
</script>
