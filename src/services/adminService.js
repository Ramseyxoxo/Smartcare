import api from './api.js'

export const adminService = {
  getDashboard: async () => {
    const response = await api.get('/admin/dashboard')
    return response.data
  },

  // Users
  getUsers: async (params = {}) => {
    const response = await api.get('/admin/users', { params })
    return response.data
  },

  createUser: async (userData) => {
    const response = await api.post('/admin/users', userData)
    return response.data
  },

  updateUser: async (id, userData) => {
    const response = await api.put(`/admin/users/${id}`, userData)
    return response.data
  },

  deleteUser: async (id) => {
    const response = await api.delete(`/admin/users/${id}`)
    return response.data
  },

  // Doctors
  getDoctors: async (params = {}) => {
    const response = await api.get('/admin/doctors', { params })
    return response.data
  },

  createDoctor: async (doctorData) => {
    const response = await api.post('/admin/doctors', doctorData)
    return response.data
  },

  updateDoctor: async (id, doctorData) => {
    const response = await api.put(`/admin/doctors/${id}`, doctorData)
    return response.data
  },

  deleteDoctor: async (id) => {
    const response = await api.delete(`/admin/doctors/${id}`)
    return response.data
  },

  // Patients
  getPatients: async (params = {}) => {
    const response = await api.get('/admin/patients', { params })
    return response.data
  },

  // Departments
  getDepartments: async () => {
    const response = await api.get('/admin/departments')
    return response.data
  },

  createDepartment: async (departmentData) => {
    const response = await api.post('/admin/departments', departmentData)
    return response.data
  },

  updateDepartment: async (id, departmentData) => {
    const response = await api.put(`/admin/departments/${id}`, departmentData)
    return response.data
  },

  deleteDepartment: async (id) => {
    const response = await api.delete(`/admin/departments/${id}`)
    return response.data
  },

  // Appointments
  getAppointments: async (params = {}) => {
    const response = await api.get('/admin/appointments', { params })
    return response.data
  },
}
