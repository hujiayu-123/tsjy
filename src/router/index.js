import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: () => import(/* webpackChunkName: "layout" */ '../views/layout.vue'),
    children: [
      {
        path: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/bookInfo/home.vue')
      },
      {
        path: 'bookList',
        component: () => import(/* webpackChunkName: "bookList" */ '../views/bookInfo/bookList.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '../views/register.vue')
  },
  {
    path: '/reset',
    name: 'reset',
    component: () => import(/* webpackChunkName: "reset" */ '../views/reset.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to,from,next)=>{
// 	if(to.path != '/login' && to.path != '/register'){
// 		if(localStorage.getItem('token') != null){
// 			next()
// 		}else{
// 			next('/login')
// 		}
// 	}else{
//     next()
//     localStorage.clear()
// 	}
// })

export default router
