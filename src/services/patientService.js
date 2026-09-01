import api from './api.js'

export const patientService = {
  getDashboard: async () => {
    const response = await api.get('/patient/dashboard')
    return response.data
  },

  getDoctors: async (params = {}) => {
    const response = await api.get('/patient/doctors', { params })
    return response.data
  },

  getDepartments: async () => {
    const response = await api.get('/patient/departments')
    return response.data
  },

  getAppointments: async () => {
    const response = await api.get('/patient/appointments')
    return response.data
  },

  bookAppointment: async (appointmentData) => {
    const response = await api.post('/patient/appointments', appointmentData)
    return response.data
  },

  getAppointment: async (id) => {
    const response = await api.get(`/patient/appointments/${id}`)
    return response.data
  },

  cancelAppointment: async (id) => {
    const response = await api.post(`/patient/appointments/${id}/cancel`)
    return response.data
  },

  rescheduleAppointment: async (id, data) => {
    const response = await api.post(`/patient/appointments/${id}/reschedule`, data)
    return response.data
  },

  getMedicalRecords: async () => {
    const response = await api.get('/patient/medical-records')
    return response.data
  },

  getPrescriptions: async () => {
    const response = await api.get('/patient/prescriptions')
    return response.data
  },

  getProfile: async () => {
    const response = await api.get('/patient/profile')
    return response.data
  },

  updateProfile: async (profileData) => {
    const response = await api.put('/patient/profile', profileData)
    return response.data
  },
}
