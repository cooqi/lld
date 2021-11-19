import router from './router'
import store from './store'
import { getToken } from '@/utils/auth' // get token from cookie
router.beforeEach((to, from, next) => {
  // 跳转前判断用户的权限
  const userInfo = store.getters.userInfo

  const whiteList = ['/login'] // 登录、角色白名单
  const role_whiteList = []// 仅仅是角色白名单
  // 跳转前，先判断用户有没有登录
  if (getToken()) {
    if (whiteList.indexOf(to.path) > -1 || role_whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      if (userInfo) {
        next()
      } else {
        store.dispatch('user/getUserInfo')
          .then(res => {
            next({ ...to })
          })
          .catch(error => {
            console.log(error || 'Has Error')
            next('/login')
          })
      }
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
