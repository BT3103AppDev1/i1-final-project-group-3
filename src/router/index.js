import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Login from '@/views/Login.vue'
import Registration from '@/views/Registration.vue'
import SignUp2 from '@/views/SignUp2.vue'
import SignUp3 from '@/views/SignUp3.vue'
import SignUp4 from '@/views/SignUp4.vue'

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
      path: '/registration',
      name: 'Registration',
      component: Registration
  },
  {
      path: '/registration2',
      name: 'SignUp2',
      component: SignUp2
  },
  {
      path: '/registration3',
      name: 'SignUp3',
      component: SignUp3
  },
  {
    path: '/registration4',
    name: 'SignUp4',
    component: SignUp4
    }



]

const router = createRouter({
  history: createWebHistory(),
  routes



})

export default router
