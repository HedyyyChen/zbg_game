import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/myphone',
    name: 'MyPhone',
    component: () => import('../views/MyPhone.vue')
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import('../views/Chat.vue')
  },
  {
    path: '/chat2',
    name: 'Chat2',
    component: () => import('../views/Chat2.vue')
  },
  {
    path: '/chat3',
    name: 'Chat3',
    component: () => import('../views/Chat3.vue')
  },
  {
    path: '/otherchat',
    name: 'OtherChat',
    component: () => import('../views/OtherChat.vue')
  },
  {
    path: '/searchplace',
    name: 'SearchPlace',
    component: () => import('../views/SearchPlace.vue')
  },
  {
    path: '/emailplace',
    name: 'EmailPlace',
    component: () => import('../views/EmailPlace.vue')
  },
  {
    path: '/jiankong',
    name: 'JianKong',
    component: () => import('../views/JianKong.vue')
  },
  {
    path: '/shuijinqiuzhanbuguan',
    name: 'ShuiJinQiuZhanBuGuan',
    component: () => import('../views/ShuiJinQiuZhanBuGuan.vue')
  },
  {
    path: '/shuijinqiuzhuyishixiang',
    name: 'ShuiJinQiuZhuYiShiXiang',
    component: () => import('../views/ShuiJinQiuZhuYiShiXiang.vue')
  },
  {
    path: '/chenlinlin',
    name: 'ChenLinLin',
    component: () => import('../views/ChenLinLin.vue')
  },
  {
    path: '/shuijinqiunewguy',
    name: 'ShuiJinQiuNewGuy',
    component: () => import('../views/ShuiJinQiuNewGuy.vue')
  },
  {
    path: '/shudongchat',
    name: 'ShuDongChat',
    component: () => import('../views/ShuDongChat.vue')
  },
  {
    path: '/yuangonglogin',
    name: 'YuanGongLogin',
    component: () => import('../views/YuanGongLogin.vue')
  },
  {
    path: '/iptransform',
    name: 'IpTransform',
    component: () => import('../views/IpTransform.vue')
  },
  {
    path: '/ultimate',
    name: 'Ultimate',
    component: () => import('../views/Ultimate.vue')
  },
  {
    path: '/hidepage',
    name: 'HidePage',
    component: () => import('../views/HidePage.vue')
  },
  {
    path: '/mubiaojindu',
    name: 'MuBiaoJinDu',
    component: () => import('../views/MuBiaoJinDu.vue')
  },
  {
    path: '/findyou',
    name: 'FindYou',
    component: () => import('../views/FindYou.vue')
  },
  {
    path: '/jubaoren',
    name: 'JuBaoRen',
    component: () => import('../views/JuBaoRen.vue')
  },
  {
    path: '/truthend',
    name: 'TruthEnd',
    component: () => import('../views/TruthEnd.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

