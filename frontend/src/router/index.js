import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'home',
      component: Home
    },
    {
      path: '/post',
      name: 'Post',
      component: () => import('../views/Post.vue')
    },
    {
      path: '/profil',
      name: 'profil',
      component: () => import('../views/Profil.vue'),
    },  
  ]
})

export default router
