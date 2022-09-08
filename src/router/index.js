import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue') // 懒加载
  },
  {
    path: '/',
    component: () => import('../views/layout/index'), // 懒加载
    redirect: '/home',
    children: [
      {
        path: 'home', // 默认子路由，只能是为一个
        name: 'home',
        component: () => import('@/views/home/index')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa/index')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/index')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/index')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/search/search') // 懒加载
  },
  {
    path: '/article/:articleId',
    name: 'article',
    props: true, // 开启 Props 传参，说白了就是把路由参数映射到组件中
    component: () => import('../views/article/article.vue') // 懒加载
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
