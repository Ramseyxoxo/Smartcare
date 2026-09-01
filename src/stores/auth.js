import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '@/services/authService.js'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  // Load from localStorage on initialization
  const initializeAuth = () => {
    const storedToken = localStorage.getItem('auth_token')
    const storedUser = localStorage.getItem('user')

    if (storedToken && storedUser) {
      token.value = storedToken
      user.value = JSON.parse(storedUser)
    }
  }

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  const userRole = computed(() => user.value?.role || null)

  const isPatient = computed(() => userRole.value === 'patient')

  const isDoctor = computed(() => userRole.value === 'doctor')

  const isAdmin = computed(() => userRole.value === 'admin')

  const login = async (email, password) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await authService.login(email, password)

      token.value = response.token || response.access_token
      user.value = response.user

      localStorage.setItem('auth_token', token.value)
      localStorage.setItem('user', JSON.stringify(user.value))

      return response
    } catch (err) {
      error.value = err.response?.data?.message || 'Login failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const register = async (userData) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await authService.register(userData)

      token.value = response.token || response.access_token
      user.value = response.user

      localStorage.setItem('auth_token', token.value)
      localStorage.setItem('user', JSON.stringify(user.value))

      return response
    } catch (err) {
      error.value = err.response?.data?.message || 'Registration failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      user.value = null
      token.value = null
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
    }
  }

  const fetchCurrentUser = async () => {
    if (!token.value) return

    isLoading.value = true
    try {
      const response = await authService.getCurrentUser()
      user.value = response.user || response
      localStorage.setItem('user', JSON.stringify(user.value))
    } catch (err) {
      error.value = 'Failed to fetch user'
      logout()
    } finally {
      isLoading.value = false
    }
  }

  const updateProfile = async (userData) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await authService.updateProfile(userData)
      user.value = response.user || response
      localStorage.setItem('user', JSON.stringify(user.value))
      return response
    } catch (err) {
      error.value = err.response?.data?.message || 'Update failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    userRole,
    isPatient,
    isDoctor,
    isAdmin,
    initializeAuth,
    login,
    register,
    logout,
    fetchCurrentUser,
    updateProfile,
  }
})
