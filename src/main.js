import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入Vant ui组件库
import Vant from 'vant'
import 'vant/lib/index.css'
// 动态设置rem加载
import 'amfe-flexible'
// 引入全局样式
import './styles/index.less'
// 引入icon字体图标
import './styles/icon.less'
// 引入时间处理模块
import './utils/dayjs.js'
// 引入lodash
import _ from 'lodash'
// 构建lodash的全局方法
Vue.prototype.$_ = _
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
