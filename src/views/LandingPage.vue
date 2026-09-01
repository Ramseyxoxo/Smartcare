<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <h1 class="text-2xl font-bold text-blue-600">SmartCare</h1>
        <div class="space-x-4">
          <RouterLink to="/login" class="text-gray-700 hover:text-blue-600 font-medium">
            Login
          </RouterLink>
          <RouterLink
            to="/register"
            class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium"
          >
            Get Started
          </RouterLink>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <h2 class="text-5xl font-bold text-gray-900 mb-6">Healthcare made simpler</h2>
      <p class="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
        SmartCare helps patients, doctors, and hospitals manage appointments and healthcare
        information efficiently and securely.
      </p>
      <div class="flex gap-4 justify-center">
        <RouterLink
          to="/register"
          class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold transition"
        >
          Get Started
        </RouterLink>
        <RouterLink
          to="/login"
          class="bg-white text-blue-600 px-8 py-3 rounded-lg border-2 border-blue-600 hover:bg-blue-50 font-semibold transition"
        >
          Login
        </RouterLink>
      </div>
    </section>

    <!-- Features Section -->
    <section class="bg-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 class="text-3xl font-bold text-center mb-12">Why SmartCare?</h3>
        <div class="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div class="text-center">
            <div class="text-4xl mb-4">📅</div>
            <h4 class="font-bold text-lg mb-2">Easy Appointment Booking</h4>
            <p class="text-gray-600">Book appointments with doctors in seconds</p>
          </div>
          <div class="text-center">
            <div class="text-4xl mb-4">👨‍⚕️</div>
            <h4 class="font-bold text-lg mb-2">Doctor Management</h4>
            <p class="text-gray-600">Find and connect with specialist doctors</p>
          </div>
          <div class="text-center">
            <div class="text-4xl mb-4">📋</div>
            <h4 class="font-bold text-lg mb-2">Medical Records</h4>
            <p class="text-gray-600">Access your complete medical history</p>
          </div>
          <div class="text-center">
            <div class="text-4xl mb-4">💊</div>
            <h4 class="font-bold text-lg mb-2">Prescription Management</h4>
            <p class="text-gray-600">View and manage your prescriptions</p>
          </div>
          <div class="text-center">
            <div class="text-4xl mb-4">🔒</div>
            <h4 class="font-bold text-lg mb-2">Secure Information</h4>
            <p class="text-gray-600">Your health data is protected</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SDG Section -->
    <section class="bg-blue-50 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="text-6xl mb-4">🌍</div>
        <h3 class="text-3xl font-bold mb-4">Supporting SDG 3</h3>
        <p class="text-gray-700 max-w-2xl mx-auto text-lg">
          <strong>Good Health and Well-being</strong><br />
          SmartCare is committed to supporting the United Nations Sustainable Development Goal 3 by
          improving access to quality healthcare and making healthcare management efficient and
          accessible to all.
        </p>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 class="font-bold text-lg mb-4">SmartCare</h4>
            <p class="text-gray-400">Healthcare made simpler.</p>
          </div>
          <div>
            <h4 class="font-bold mb-4">About</h4>
            <p class="text-gray-400">Simplifying healthcare management for everyone.</p>
          </div>
          <div>
            <h4 class="font-bold mb-4">SDG 3</h4>
            <p class="text-gray-400">Good Health and Well-being</p>
          </div>
          <div>
            <h4 class="font-bold mb-4">Contact</h4>
            <p class="text-gray-400">For support, reach out to our team.</p>
          </div>
        </div>
        <div class="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 SmartCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth.js'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const authStore = useAuthStore()
const router = useRouter()

// Redirect if already authenticated
onMounted(() => {
  if (authStore.isAuthenticated) {
    if (authStore.isPatient) router.push('/patient/dashboard')
    else if (authStore.isDoctor) router.push('/doctor/dashboard')
    else if (authStore.isAdmin) router.push('/admin/dashboard')
  }
})
</script>
