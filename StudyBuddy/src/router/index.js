import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Login from '@/views/Login.vue'

const routes =[
  {
      path: '/',
      name: 'Home',
      component: HomeView

  },
  {
      path: '/login',
      name: 'Login', 
      component: Login,

  }



]

const router = createRouter({
  history: createWebHistory(),
  routes



})

export default router
