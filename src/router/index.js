import { createRouter, createWebHistory } from 'vue-router'
import Authorization from '../views/Authorization.vue'

const routes = [
  {
    path: '/',
    name: 'authorization',
    component: Authorization
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
