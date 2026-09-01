import api from './api.js'

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/login', { email, password })
    return response.data
  },

  register: async (userData) => {
    const response = await api.post('/register', userData)
    return response.data
  },

  logout: async () => {
    try {
      await api.post('/logout')
    } catch (error) {
      console.error('Logout error:', error)
    }
  },

  getCurrentUser: async () => {
    const response = await api.get('/user')
    return response.data
  },

  updateProfile: async (userData) => {
    const response = await api.put('/user/profile', userData)
    return response.data
  },
}
