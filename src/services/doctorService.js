import api from './api.js'

export const doctorService = {
  getDashboard: async () => {
    const response = await api.get('/doctor/dashboard')
    return response.data
  },

  getAppointments: async (params = {}) => {
    const response = await api.get('/doctor/appointments', { params })
    return response.data
  },

  getAppointment: async (id) => {
    const response = await api.get(`/doctor/appointments/${id}`)
    return response.data
  },

  updateAppointmentStatus: async (id, status) => {
    const response = await api.put(`/doctor/appointments/${id}/status`, { status })
    return response.data
  },

  getPatients: async () => {
    const response = await api.get('/doctor/patients')
    return response.data
  },

  getMedicalRecords: async () => {
    const response = await api.get('/doctor/medical-records')
    return response.data
  },

  getMedicalRecord: async (id) => {
    const response = await api.get(`/doctor/medical-records/${id}`)
    return response.data
  },

  createMedicalRecord: async (recordData) => {
    const response = await api.post('/doctor/medical-records', recordData)
    return response.data
  },

  updateMedicalRecord: async (id, recordData) => {
    const response = await api.put(`/doctor/medical-records/${id}`, recordData)
    return response.data
  },

  createPrescription: async (recordId, prescriptionData) => {
    const response = await api.post(
      `/doctor/medical-records/${recordId}/prescriptions`,
      prescriptionData,
    )
    return response.data
  },

  getPrescriptions: async (recordId) => {
    const response = await api.get(`/doctor/medical-records/${recordId}/prescriptions`)
    return response.data
  },

  getProfile: async () => {
    const response = await api.get('/doctor/profile')
    return response.data
  },

  updateProfile: async (profileData) => {
    const response = await api.put('/doctor/profile', profileData)
    return response.data
  },
}
