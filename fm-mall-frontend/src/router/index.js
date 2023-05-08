import { createRouter, createWebHistory } from 'vue-router'
import routerWatcher from '@/utils/routerWatcher'
// 页面较少，暂不分模块
const routes = [
  {
    path: '/',
    name: 'default',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    meta: {label: 'Home'},
    component: () => import('../views/home/pageMain.vue')
  },
  
  {
    path: '/login',
    name: 'login',
    meta: {fullScreen: true, authorisation: false, label: 'Login'},
    component: () => import('../views/login/pageMain.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {fullScreen: true, authorisation: false, label: 'Register'}, // fullScreen是否全屏，authorisation是否需要授权访问
    component: () => import('../views/register/pageMain.vue')
  },
  {
    path: '/user/personal',
    name: 'personal',
    meta: {label: 'Personal'},
    component: () => import('../views/personal/pageMain.vue')
  },
  {
    path: '/custome/shopcar',
    name: 'shopcar',
    meta: {label: 'Car'},
    component: () => import('../views/shopcar/pageMain.vue')
  },
  {
    path: '/custome/orderlist',
    name: 'orderList',
    meta: {label: 'Order List'},
    component: () => import('../views/orderlist/pageMain.vue')
  },
  {
    path: '/custome/orderdetail',
    name: 'orderDetail',
    meta: {label: 'Order List'},
    component: () => import('../views/orderlist/pageDetail.vue')
  },
  {
    path: '/custome/products',
    name: 'customeProducts',
    meta: {label: 'Products'},
    component: () => import('../views/products/pageMain.vue')
  },
  {
    path: '/custome/detail',
    name: 'customeDetail',
    meta: {label: 'Products Detail'},
    component: () => import('../views/products/pageDetail.vue')
  },
  {
    path: '/custome/wish',
    name: 'customeWish',
    meta: {label: 'Wish List'},
    component: () => import('../views/wish/pageMain.vue')
  },
  {
    path: '/business/list',
    name: 'businessList',
    meta: {label: 'My Trade List'},
    component: () => import('../views/business/businessList.vue')
  },
  {
    path: '/business/modify',
    name: 'businessModify',
    meta: {label: 'Modify My Trade'},
    component: () => import('../views/business/businessModify.vue')
  },
  {
    path: '/business/import',
    name: 'businessImport',
    meta: {label: 'Import Trades'},
    component: () => import('../views/business/businessImport.vue')
  },
  {
    path: '/admin/goodsList',
    name: 'adminGoodsList',
    meta: {label: 'All Goods'},
    component: () => import('../views/summary/goodsList.vue')
  },
  {
    path: '/admin/orderList',
    name: 'adminOrderList',
    meta: {label: 'All Order'},
    component: () => import('../views/summary/orderList.vue')
  },
  {
    path: '/admin/soldList',
    name: 'adminsoldList',
    meta: {label: 'Sold Records'},
    component: () => import('../views/summary/soldList.vue')
  },
  {
    path: '/admin/userList',
    name: 'adminuserList',
    meta: {label: 'All Users'},
    component: () => import('../views/summary/userList.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // 进行权限验证等操作
  // next()
  routerWatcher(to, from, next)
})

export default router
