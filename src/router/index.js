import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'

// Landing & Auth
import LandingPage from '@/views/LandingPage.vue'
import LoginPage from '@/views/auth/LoginPage.vue'
import RegisterPage from '@/views/auth/RegisterPage.vue'

// Patient Views
import PatientDashboard from '@/views/patient/PatientDashboard.vue'
import PatientAppointments from '@/views/patient/PatientAppointments.vue'
import PatientDoctors from '@/views/patient/PatientDoctors.vue'
import BookAppointment from '@/views/patient/BookAppointment.vue'
import MedicalRecords from '@/views/patient/MedicalRecords.vue'
import Prescriptions from '@/views/patient/Prescriptions.vue'
import PatientProfile from '@/views/patient/PatientProfile.vue'

// Doctor Views
import DoctorDashboard from '@/views/doctor/DoctorDashboard.vue'
import DoctorAppointments from '@/views/doctor/DoctorAppointments.vue'
import DoctorPatients from '@/views/doctor/DoctorPatients.vue'
import DoctorMedicalRecords from '@/views/doctor/DoctorMedicalRecords.vue'
import MedicalRecordForm from '@/views/doctor/MedicalRecordForm.vue'

// Admin Views
import AdminDashboard from '@/views/admin/AdminDashboard.vue'
import AdminDoctors from '@/views/admin/AdminDoctors.vue'
import AdminPatients from '@/views/admin/AdminPatients.vue'
import AdminDepartments from '@/views/admin/AdminDepartments.vue'
import AdminAppointments from '@/views/admin/AdminAppointments.vue'

// Shared
import ProfilePage from '@/views/ProfilePage.vue'
import NotFoundPage from '@/views/NotFoundPage.vue'

const routes = [
  // Public Routes
  {
    path: '/',
    name: 'Home',
    component: LandingPage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage,
  },

  // Patient Routes
  {
    path: '/patient/dashboard',
    name: 'PatientDashboard',
    component: PatientDashboard,
    meta: { requiresAuth: true, role: 'patient' },
  },
  {
    path: '/patient/appointments',
    name: 'PatientAppointments',
    component: PatientAppointments,
    meta: { requiresAuth: true, role: 'patient' },
  },
  {
    path: '/patient/appointments/book',
    name: 'BookAppointment',
    component: BookAppointment,
    meta: { requiresAuth: true, role: 'patient' },
  },
  {
    path: '/patient/doctors',
    name: 'PatientDoctors',
    component: PatientDoctors,
    meta: { requiresAuth: true, role: 'patient' },
  },
  {
    path: '/patient/medical-records',
    name: 'PatientMedicalRecords',
    component: MedicalRecords,
    meta: { requiresAuth: true, role: 'patient' },
  },
  {
    path: '/patient/prescriptions',
    name: 'PatientPrescriptions',
    component: Prescriptions,
    meta: { requiresAuth: true, role: 'patient' },
  },
  {
    path: '/patient/profile',
    name: 'PatientProfile',
    component: PatientProfile,
    meta: { requiresAuth: true, role: 'patient' },
  },

  // Doctor Routes
  {
    path: '/doctor/dashboard',
    name: 'DoctorDashboard',
    component: DoctorDashboard,
    meta: { requiresAuth: true, role: 'doctor' },
  },
  {
    path: '/doctor/appointments',
    name: 'DoctorAppointments',
    component: DoctorAppointments,
    meta: { requiresAuth: true, role: 'doctor' },
  },
  {
    path: '/doctor/patients',
    name: 'DoctorPatients',
    component: DoctorPatients,
    meta: { requiresAuth: true, role: 'doctor' },
  },
  {
    path: '/doctor/medical-records',
    name: 'DoctorMedicalRecords',
    component: DoctorMedicalRecords,
    meta: { requiresAuth: true, role: 'doctor' },
  },
  {
    path: '/doctor/medical-records/create',
    name: 'CreateMedicalRecord',
    component: MedicalRecordForm,
    meta: { requiresAuth: true, role: 'doctor' },
  },
  {
    path: '/doctor/medical-records/:id',
    name: 'EditMedicalRecord',
    component: MedicalRecordForm,
    meta: { requiresAuth: true, role: 'doctor' },
  },
  {
    path: '/doctor/profile',
    name: 'DoctorProfile',
    component: ProfilePage,
    meta: { requiresAuth: true, role: 'doctor' },
  },

  // Admin Routes
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, role: 'admin' },
  },
  {
    path: '/admin/doctors',
    name: 'AdminDoctors',
    component: AdminDoctors,
    meta: { requiresAuth: true, role: 'admin' },
  },
  {
    path: '/admin/patients',
    name: 'AdminPatients',
    component: AdminPatients,
    meta: { requiresAuth: true, role: 'admin' },
  },
  {
    path: '/admin/departments',
    name: 'AdminDepartments',
    component: AdminDepartments,
    meta: { requiresAuth: true, role: 'admin' },
  },
  {
    path: '/admin/appointments',
    name: 'AdminAppointments',
    component: AdminAppointments,
    meta: { requiresAuth: true, role: 'admin' },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage,
    meta: { requiresAuth: true },
  },

  // 404 Route
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Route Guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  // Initialize auth from localStorage on app start
  if (!authStore.user && !authStore.token) {
    authStore.initializeAuth()
  }

  const requiresAuth = to.meta.requiresAuth
  const requiredRole = to.meta.role
  const isAuthenticated = authStore.isAuthenticated

  // If route requires authentication
  if (requiresAuth) {
    if (!isAuthenticated) {
      // Redirect to login
      next('/login')
      return
    }

    // If route requires specific role
    if (requiredRole && authStore.userRole !== requiredRole) {
      // Redirect to appropriate dashboard based on user role
      if (authStore.isPatient) {
        next('/patient/dashboard')
      } else if (authStore.isDoctor) {
        next('/doctor/dashboard')
      } else if (authStore.isAdmin) {
        next('/admin/dashboard')
      } else {
        next('/login')
      }
      return
    }
  }

  // If user is authenticated and trying to access login/register, redirect to dashboard
  if (isAuthenticated && (to.path === '/login' || to.path === '/register')) {
    if (authStore.isPatient) {
      next('/patient/dashboard')
    } else if (authStore.isDoctor) {
      next('/doctor/dashboard')
    } else if (authStore.isAdmin) {
      next('/admin/dashboard')
    } else {
      next('/')
    }
    return
  }

  next()
})

export default router
