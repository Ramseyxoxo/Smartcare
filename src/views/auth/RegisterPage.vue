<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4"
  >
    <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-blue-600">SmartCare</h1>
        <p class="text-gray-600 mt-2">Healthcare made simpler.</p>
        <h2 class="text-2xl font-bold text-gray-900 mt-6">Create Account</h2>
      </div>

      <Alert v-if="error" type="error" :message="error" />

      <form @submit.prevent="handleRegister" class="space-y-4">
        <InputField
          v-model="form.name"
          name="name"
          label="Full Name"
          placeholder="John Doe"
          required
          :error="errors.name"
        />

        <InputField
          v-model="form.email"
          name="email"
          label="Email Address"
          type="email"
          placeholder="your@email.com"
          required
          :error="errors.email"
        />

        <SelectField
          v-model="form.role"
          name="role"
          label="Register as"
          placeholder="Select your role"
          required
          :error="errors.role"
          :options="[
            { value: 'patient', label: 'Patient' },
            { value: 'doctor', label: 'Doctor' },
          ]"
        />

        <InputField
          v-model="form.password"
          name="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          required
          :error="errors.password"
        />

        <InputField
          v-model="form.password_confirmation"
          name="password_confirmation"
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          required
          :error="errors.password_confirmation"
        />

        <Button
          type="submit"
          variant="primary"
          :is-loading="isLoading"
          :disabled="isLoading"
          class="w-full"
        >
          {{ isLoading ? 'Creating account...' : 'Sign Up' }}
        </Button>
      </form>

      <p class="text-center text-gray-600 mt-6">
        Already have an account?
        <RouterLink to="/login" class="text-blue-600 hover:text-blue-700 font-semibold">
          Login
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import InputField from '@/components/common/InputField.vue'
import SelectField from '@/components/common/SelectField.vue'
import Button from '@/components/common/Button.vue'
import Alert from '@/components/common/Alert.vue'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  name: '',
  email: '',
  role: '',
  password: '',
  password_confirmation: '',
})

const errors = ref({})
const error = ref('')
const isLoading = ref(false)

const handleRegister = async () => {
  errors.value = {}
  error.value = ''

  if (!form.value.name) errors.value.name = 'Name is required'
  if (!form.value.email) errors.value.email = 'Email is required'
  if (!form.value.role) errors.value.role = 'Role is required'
  if (!form.value.password) errors.value.password = 'Password is required'
  if (form.value.password !== form.value.password_confirmation) {
    errors.value.password_confirmation = 'Passwords do not match'
  }

  if (Object.keys(errors.value).length > 0) return

  isLoading.value = true
  try {
    await authStore.register({
      name: form.value.name,
      email: form.value.email,
      role: form.value.role,
      password: form.value.password,
      password_confirmation: form.value.password_confirmation,
    })

    // Redirect based on role
    if (authStore.isPatient) {
      router.push('/patient/dashboard')
    } else if (authStore.isDoctor) {
      router.push('/doctor/dashboard')
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Registration failed. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>
