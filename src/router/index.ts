// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';

const routes = [

  // Auth
  {
    path: "/",
    name: "Login",
    component: () => import("../views/auth/Login.vue"),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/auth/Register.vue'),
  },
  {
    path: "/requestPasswordReset",
    name: "requestPasswordReset",
    component: () => import("../views/auth/ForgotPassword.vue"),
  }, 
  //----------------------------------------------------------------
  // Dashboard
  {
    path: '/dashboardAdmin',
    name: 'HomeAdmin',
    component: () => import('../views/admin/DashboardAdmin.vue'), // Assurez-vous d'avoir une page d'accueil
  },
  {
    path: '/dashboardClient',
    name: 'HomeClient',
    component: () => import('../views/client/DashboardClient.vue'), // Assurez-vous d'avoir une page d'accueil
  },
  
  
  //----------------------------------------------------------------
  // route admin
  {
    path: "/listClient",
    name: "listClient",
    component: () => import("../views/admin/ListeClient.vue"),
  },
  {
    path: "/listManager",
    name: "listManager",
    component: () => import("../views/admin/ListManager.vue"),
  },
  {
    path: "/listUsers",
    name: "listUsers",
    component: () => import("../views/admin/ListUsers.vue"),
  },
  {
    path: "/profileAdmin",
    name: "profileAdmin",
    component: () => import("../views/admin/ProfileAdmin.vue"),
  },
  {
    path: "/addUser",
    name: "addUser",
    component: () => import("../views/admin/AddUser.vue"),
  },
  //----------------------------------------------------------------
  // route client
  {
    path: "/addUserClient",
    name: "addUserClient",
    component: () => import("../views/client/AddUser.vue"),
  }, 
  {
    path: "/listManagerClient",
    name: "listManagerClient",
    component: () => import("../views/client/ListManager.vue"),
  },
  {
    path: "/listUsersClient",
    name: "listUsersClient",
    component: () => import("../views/client/ListUsers.vue"),
  },
  {
    path: "/profileClient",
    name: "profileClient",
    component: () => import("../views/client/ProfileClient.vue"),
  }, 
  
  //----------------------------------------------------------------
  // route manager
  {
    path: '/dashboardManager',
    name: 'HomeManager',
    component: () => import('../views/manager/DashboardManager.vue'), // Assurez-vous d'avoir une page d'accueil
  },
  {
    path: "/addUserManager",
    name: "addUserManager",
    component: () => import("../views/manager/AddUser.vue"),
  }, 
  {
    path: "/listUsersManager",
    name: "listUsersManager",
    component: () => import("../views/manager/ListUsers.vue"),
  },
  {
    path: "/profileManager",
    name: "profileManager",
    component: () => import("../views/manager/ProfileManager.vue"),
  }, 
  //----------------------------------------------------------------
  //route user
  {
    path: '/dashboardUser',
    name: 'HomeUser',
    component: () => import('../views/user/DashboardUsers.vue'), // Assurez-vous d'avoir une page d'accueil
  },
  {
    path: "/profileUser",
    name: "profileUser",
    component: () => import("../views/user/ProfileUser.vue"),
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
