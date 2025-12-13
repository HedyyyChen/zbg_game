import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/myphone',
    name: 'MyPhone',
    component: () => import('../views/MyPhone.vue')
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import('../views/Chat.vue')
  },
  {
    path: '/chat2',
    name: 'Chat2',
    component: () => import('../views/Chat2.vue')
  },
  {
    path: '/chat3',
    name: 'Chat3',
    component: () => import('../views/Chat3.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

