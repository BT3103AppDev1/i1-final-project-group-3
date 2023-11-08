import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import Login from '@/views/Login.vue'
import LookingAtProfile from '@/views/LookingAtProfile.vue'
import Registration from '@/views/Registration.vue'
import SignUp2 from '@/views/SignUp2.vue'
import SignUp3 from '@/views/SignUp3.vue'
import SignUp4 from '@/views/SignUp4.vue'
import OwnProfileView from '@/views/OwnProfileView.vue'
import EditProfileView from '@/views/EditProfileView.vue'
import Home from '@/views/Home.vue'
import HomeGroups from '@/views/HomeGroups.vue'
import Post from '@/views/PostView.vue'
import EditPost from '@/views/EditPost.vue'
/*import Chat from '@/views/ChatsView.vue'*/
import ChatGroups from '@/views/ChatGroups.vue'
import CreatePost from '@/views/CreatePost.vue'

import Chat from '@/views/PrivateChat.vue'



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
    path: '/profile/:name',
    name: 'profile',
    component: LookingAtProfile,
    props: true

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
  {
    path: '/home',
    name: 'Home', 
    component: Home,

  },  
  {
    path: '/listofgroups',
    name: 'HomeGroups', 
    component: HomeGroups,

  }, 
  {
    path: '/post',
    name: 'Post', 
    component: Post,

  },
  {

    path: '/createpost',
    name: 'CreatePost', 
    component: CreatePost,

  },
  {

    path: '/editpost/:postId',
    name: 'EditPost', 
    component: EditPost,

  },
  /*{
    path: '/chat',
    name: 'Chat',
    component: Chat,

  }, */

  {
    path: '/chat-groups',
    name: 'ChatGroups',
    component: ChatGroups,

  }, 

  {
    path: '/chat',
    name: 'Chat',
    component: Chat,

  },



]

const router = createRouter({
  history: createWebHistory(),
  routes



})

export default router