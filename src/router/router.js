import { createRouter, createWebHistory } from 'vue-router';

import HelloWorld from '../components/HelloWorld'

// import WelcomePage from '../pages/WelcomePage.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: HelloWorld },
      { path: '/login', component: HelloWorld },
    //   { path: '/Pet/:id', component: PetPage, meta: { requiresAuth: true }},
    //   { path: '/:notFound(.*)', component: WelcomePage, meta: { requiresAuth: true }}
    ]
});
  
export default router;