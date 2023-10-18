import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import Login from '@/views/Login.vue'
import OwnProfileView from '@/views/OwnProfileView.vue'
import EditProfileView from '@/views/EditProfileView.vue'

const routes =[
  {
      path: '/',
      name: 'MainView',
      component: MainView

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

}, 
  {
    path: '/editprofile',
    name: 'EditProfile', 
    component: EditProfileView,

  }, 


]

const router = createRouter({
  history: createWebHistory(),
  routes



})

export default router
