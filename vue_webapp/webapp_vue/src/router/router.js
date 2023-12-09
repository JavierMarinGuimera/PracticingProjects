import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Redirect to home',
      redirect: "/home",
    },
    {
      path: '/home',
      name: 'Home',
      
      component: () => import('../views/home.vue')
    },
    {
      path: '/test',
      name: 'Test',

      component: () => import('../views/test.vue')
    }
  ]
})

export default router
