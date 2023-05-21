import { createRouter, createWebHistory } from 'vue-router';

import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import HomePage from '../pages/HomePage'
import CreatePoll from '../pages/CreatePollPage'
import PollDetail from '../pages/PollDetailPage'
import EditPoll from '../pages/EditPollPage'

// import WelcomePage from '../pages/WelcomePage.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/', component: LoginPage },
      { path: '/register', component: RegisterPage },
      { path: '/home', component: HomePage },
      { path: '/create', component: CreatePoll },
      { path: '/poll/:token', component: PollDetail },
      { path: '/poll/:token/edit', component: EditPoll },
    //   { path: '/Pet/:id', component: PetPage, meta: { requiresAuth: true }},
    //   { path: '/:notFound(.*)', component: WelcomePage, meta: { requiresAuth: true }}
    ]
});
  
export default router;