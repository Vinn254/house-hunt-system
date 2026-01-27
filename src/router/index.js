import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '../firebase/config';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomePage.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/house/:id',
    name: 'HouseDetail',
    component: () => import('../views/HouseDetail.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginPage.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/UserDashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: () => import('../views/AdminDashboard.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/relocation',
    name: 'Relocation',
    component: () => import('../views/RelocationService.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutPage.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('../views/HelpPage.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/ContactPage.vue'),
    meta: { requiresAuth: false }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

// Navigation guard
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const currentUser = auth.currentUser;

  if (requiresAuth && !currentUser) {
    // Store the intended destination
    sessionStorage.setItem('redirectAfterLogin', to.fullPath);
    next('/login');
  } else {
    next();
  }
});

export default router;
