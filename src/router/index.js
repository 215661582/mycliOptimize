import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import Home from '@/components/HelloWorld.vue'
const Home = () => import(/* webpackChunkName: "home" */ '@/components/HelloWorld.vue')
// import Login from '@/components/login/login.vue'
const Login = () => import(/* webpackChunkName: "login" */ '@/components/login/login.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
