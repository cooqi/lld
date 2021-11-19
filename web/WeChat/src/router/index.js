import Vue from 'vue'
import VueRouter from 'vue-router'

// 模块化
import routersModules from './module'
const Home = () => import('@/views/Home')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: { title: '登录' }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { title: '首页', header: false }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search'),
    meta: { title: '搜搜' }
  },

  ...routersModules,
  {
    path: '/404',
    component: () => import('@/views/error-page/404')
  },
  { path: '*', redirect: '/404' }
]

const router = new VueRouter({
  routes
})

export default router
