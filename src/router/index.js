
import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'



const ifNotAuth = (to, from, next) => {
  if(!localStorage.getItem('token')) return next()
  next('/')
}

const ifAuth = (to, from, next) => {
  if(localStorage.getItem('token')) return next()
  return next('/auth')
}


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: ifAuth
    

  },
  
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/views/AuthView.vue'),
    beforeEnter: ifNotAuth
  },

  {
    path: '/orders',
    name: 'orders',
    component: () => import('@/views/OrderBoardView.vue'),
    beforeEnter: ifAuth
  },

  {
    path: '/clients',
    name: 'clients',
    component: () => import('@/views/ClientsView.vue'),
    beforeEnter: ifAuth
  },

  {  
    path:'/admin',
    name: 'admin',
    component: () => import('@/views/AdminView.vue'),
    beforeEnter: ifAuth

  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})




export default router
