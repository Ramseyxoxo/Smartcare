<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4"
  >
    <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-blue-600">SmartCare</h1>
        <p class="text-gray-600 mt-2">Healthcare made simpler.</p>
        <h2 class="text-2xl font-bold text-gray-900 mt-6">Welcome Back</h2>
      </div>

      <Alert v-if="error" type="error" :message="error" />

      <form @submit.prevent="handleLogin" class="space-y-4">
        <InputField
          v-model="form.email"
          name="email"
          label="Email Address"
          type="email"
          placeholder="your@email.com"
          required
          :error="errors.email"
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

        <Button
          type="submit"
          variant="primary"
          :is-loading="isLoading"
          :disabled="isLoading"
          class="w-full"
        >
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </Button>
      </form>

      <p class="text-center text-gray-600 mt-6">
        Don't have an account?
        <RouterLink to="/register" class="text-blue-600 hover:text-blue-700 font-semibold">
          Sign up
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
import Button from '@/components/common/Button.vue'
import Alert from '@/components/common/Alert.vue'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: '',
})

const errors = ref({})
const error = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  errors.value = {}
  error.value = ''

  if (!form.value.email) {
    errors.value.email = 'Email is required'
  }
  if (!form.value.password) {
    errors.value.password = 'Password is required'
  }

  if (Object.keys(errors.value).length > 0) return

  isLoading.value = true
  try {
    await authStore.login(form.value.email, form.value.password)

    // Redirect based on role
    if (authStore.isPatient) {
      router.push('/patient/dashboard')
    } else if (authStore.isDoctor) {
      router.push('/doctor/dashboard')
    } else if (authStore.isAdmin) {
      router.push('/admin/dashboard')
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Login failed. Please check your credentials.'
  } finally {
    isLoading.value = false
  }
}
</script>
