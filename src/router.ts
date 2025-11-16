import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('./views/LoginView.vue'),
  },
]

export const rotuer = createRouter({
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
})
