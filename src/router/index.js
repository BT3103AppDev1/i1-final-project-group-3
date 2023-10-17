import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Login from '@/views/Login.vue'
import OwnProfileView from '@/views/OwnProfileView.vue'

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

  }, 
  {
    path: '/ownprofile',
    name: 'OwnProfile', 
    component: OwnProfileView,

}

]

const router = createRouter({
  history: createWebHistory(),
  routes



})

export default router
