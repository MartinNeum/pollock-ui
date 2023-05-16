import { createRouter, createWebHistory } from 'vue-router';

import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'

// import WelcomePage from '../pages/WelcomePage.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: LoginPage },
      { path: '/register', component: RegisterPage },
    //   { path: '/Pet/:id', component: PetPage, meta: { requiresAuth: true }},
    //   { path: '/:notFound(.*)', component: WelcomePage, meta: { requiresAuth: true }}
    ]
});
  
export default router;