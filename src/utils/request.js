import axios from 'axios'
import store from '@/store'

// 封装 axios请求
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/'
// 高级api-create,用来解决什么问题?
// create解决项目当中有多个请求地址,会让代码更好维护
export const request = axios.create({
  baseURL: 'http://toutiao.itheima.net/' // 基础路径
})

/*
  只要是需要登录后访问的接口，都需要token作为请求头
  所以我们需要通过axios的请求拦截器来统一设置已登录后的接口的请求头

  请求拦截器 - 建议放到个人笔记中
*/
request.interceptors.request.use(config => {
  // 判断是否登录 => store中的user是否携带token
  if (store.state.user.token) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }

  return config
}, (error) => {
  // 如果请求出错了，  - 抛出promise的错误异常
  return Promise.reject(error)
})
