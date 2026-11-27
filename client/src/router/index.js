import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // Home
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
  },

  // Words
  {
    path: '/words/',
    name: 'words',
    component: () => import('@/views/words/index.vue'),
  },
  {
    path: '/words/practice',
    name: 'words-practice',
    component: () => import('@/views/words/practice.vue'),
  },
  {
    path: '/grammar/',
    name: 'grammar',
    component: () => import('@/views/grammar/index.vue'),
  },
  {
    path: '/grammar/:topic',
    name: 'grammar-page',
    component: () => import('@/views/grammar/page.vue'),
  },
  {
    path: '/read/',
    name: 'read',
    component: () => import('@/views/read/index.vue'),
  },
  {
    path: '/read/:title',
    name: 'read-page',
    component: () => import('@/views/read/page.vue')
  },
  // 404 Page Not found
  { 
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue') 
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  strict: false,
  scrollBehavior: () => ({ top: 0 }),
})

export default router