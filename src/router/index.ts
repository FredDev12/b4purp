// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';

const routes = [

  // Auth
  {
    path: "/",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: "/requestPasswordReset",
    name: "requestPasswordReset",
    component: () => import("../views/ForgotPassword.vue"),

  }, 
  //----------------------------------------------------------------
  // Dashboard
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/dashboard.vue'), // Assurez-vous d'avoir une page d'accueil
  },
  
  
  //----------------------------------------------------------------
  // route admin
  {
    path: "/liste",
    name: "liste",
    component: () => import("../views/liste.vue"),
  },
 
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/profile.vue"),
  },
  {
    path: "/addUser",
    name: "addUser",
    component: () => import("../views/EntityManagement.vue"),
  },
  //----------------------------------------------------------------
  
  //----------------------------------------------------------------

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guard pour protéger les routes
router.beforeEach((to, _, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;
