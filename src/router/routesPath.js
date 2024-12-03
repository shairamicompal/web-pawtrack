import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import DashboardView from '@/views/system/DashboardView.vue'
import ForbiddenView from '@/views/errors/ForbiddenView.vue'
import NotFoundView from '@/views/errors/NotFoundView.vue'
import AccountSettingsView from '@/views/system/AccountSettingsView.vue'
import AboutView from '@/views/system/AboutView.vue'
import ReportsPageView from '@/views/system/ReportsPageView.vue'
import ContactView from '@/views/system/ContactView.vue'
import GuideView from '@/views/system/GuideView.vue'
import PetFactsView from '@/views/system/PetFactsView.vue'
// import ReportPostView from '@/views/system/ReportPostView.vue'

// 👉 Routes
export const routesPath = [
  // Auth Pages
  {
    path: '/',
    name: 'home'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { requiresAuth: false }
  },

  // System Pages

  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
  },
  {
    path: '/reports',
    name: 'reports',
    component: ReportsPageView,
    meta: { requiresAuth: true }
  },
  {
    path: '/pet-tips-&-facts',
    name: 'pet-tips-&-facts',
    component: PetFactsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/guide',
    name: 'guide',
    component: GuideView,
    meta: { requiresAuth: true }
  },
  {
    path: '/contact-us',
    name: 'contact-us',
    component: ContactView,
    meta: { requiresAuth: true }
  },
  {
    path: '/account/settings',
    name: 'account-settings',
    component: AccountSettingsView,
    meta: { requiresAuth: true }
  },

  // Errors Pages
  {
    path: '/forbidden',
    name: 'forbidden',
    component: ForbiddenView,
    meta: { isDefault: true }
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: NotFoundView,
    meta: { isDefault: true }
  }
]
