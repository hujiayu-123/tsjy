import { Col } from 'element-ui'
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
	if(to.path != '/login' && to.path != '/register'){
		if(localStorage.getItem('token') != null){
			next()
		}else{
			next('/login')
		}
	}else{
    next()
    localStorage.clear()
	}
})

export default router
