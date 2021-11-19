import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant, { Lazyload, Skeleton, Toast, Dialog, SwipeCell } from 'vant'
import 'vant/lib/index.css'

// 重置基础样式
import './assets/css/reset.css'

// 过滤器
import * as filters from './filters'

// 全局模板注册
import { components } from '@/components/plug'

// loading
import * as loading from '@/utils/loading'

// 第三方数据处理插件
import _ from 'lodash'

// 日历
import vueHashCalendar from 'vue-hash-calendar'
// 引入组件CSS样式
import 'vue-hash-calendar/lib/vue-hash-calendar.css'
// 注册组件库
Vue.use(vueHashCalendar)

// 路由权限控制
// import './permission'

Vue.use(Lazyload).use(Skeleton).use(Toast).use(Dialog).use(SwipeCell)
Vue.use(Vant) // global filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
components.forEach(component => {
  Vue.component(component.name, component)
})
Vue.prototype.$loading = loading

Vue.config.productionTip = false
Vue.prototype._ = _

// 过度动画监听返回
window.addEventListener('popstate', function (e) {
  router.isBack = true
}, false)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
