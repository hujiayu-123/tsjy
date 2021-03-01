import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: () => import(/* webpackChunkName: "layout" */ '../views/bookInfo/index.vue'),
    children: [
      {
        path: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/bookInfo/home.vue')
      },
      {
        path: 'bookList',
        component: () => import(/* webpackChunkName: "bookList" */ '../views/bookInfo/bookList.vue')
      },
      {
        path: 'detail',
        component: () => import(/* webpackChunkName: "detail" */ '../views/bookInfo/detail.vue')
      },
      {
        path: 'user',
        redirect: '/user/center',
        component: () => import(/* webpackChunkName: "detail" */ '../views/user/index.vue'),
        children: [
          {
            path: 'center',
            component: () => import(/* webpackChunkName: "center" */ '../views/user/center.vue')
          },
          {
            path: 'comment',
            component: () => import(/* webpackChunkName: "comment" */ '../views/user/comment.vue')
          },
          {
            path: 'order',
            component: () => import(/* webpackChunkName: "order" */ '../views/user/order.vue')
          },
          {
            path: 'address',
            component: () => import(/* webpackChunkName: "address" */ '../views/user/address.vue')
          },
          {
            path: 'likeShop',
            component: () => import(/* webpackChunkName: "likeShop" */ '../views/user/likeShop.vue')
          },
          {
            path: 'userInfo',
            component: () => import(/* webpackChunkName: "userInfo" */ '../views/user/userInfo.vue')
          },
          {
            path: 'detail',
            component: () => import(/* webpackChunkName: "detail" */ '../views/user/detail.vue')
          },
        ]
      }
    ]
  },
  {
    path: '/buy',
    name: 'buy',
    redirect: '/buy/buyCar',
    component: () => import(/* webpackChunkName: "buy" */ '../views/buyInfo/index.vue'),
    children: [
      {
        path: 'buyCar',
        component: () => import(/* webpackChunkName: "detail" */ '../views/buyInfo/buyCar.vue')
      },
      {
        path: 'okOrder',
        name: 'okOrder',
        component: () => import(/* webpackChunkName: "detail" */ '../views/buyInfo/okOrder.vue')
      },
      {
        path: 'confirm',
        component: () => import(/* webpackChunkName: "confirm" */ '../views/buyInfo/confirm.vue')
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

const routePath = ['/login','/register','/reset','/home','/bookList','/detail']

router.beforeEach((to,from,next)=>{
	if(routePath.indexOf(to.path) == -1){
		if(localStorage.getItem('token') != null){
			next()
		}else{
			next('/login')
		}
	}else{
    next()
	}
})

export default router
