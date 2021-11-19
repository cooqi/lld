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

// 路由权限控制
// import './permission'

Vue.use(Vant) // global filters
Vue.use(Lazyload).use(Skeleton).use(Toast).use(Dialog).use(SwipeCell)
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
