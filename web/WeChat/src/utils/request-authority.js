import axios from 'axios'
import { Notify } from 'vant'
import store from '@/store'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // VUE_APP_BASE_API_clf
  withCredentials: true//, // send cookies when cross-domain requests
  // timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['uiticket'] = getToken()
    //   config.headers['sid'] = getSid() || ''
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    return res
  },
  error => {
    console.log('err' + error) // for debug
    if (error.response) {
      switch (error.response.status) {
        case 401:
          Notify({
            message: '登录凭证已经失效请重新登录', // error.message
            type: 'error',
            duration: 3000
          })
          // 返回 401 清除token信息并跳转到登录页面
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
          store.dispatch('user/resetSid')
          break
        case 403:
          // 返回 403 提示无权限
          Notify({
            message: '您没有权限访问', // error.message
            type: 'error',
            duration: 3 * 1000
          })
          break
        default:
          Notify({
            message: '请求超时，请稍后重试', // error.message
            type: 'error',
            duration: 5 * 1000
          })
      }
    }
    return Promise.reject(error)
  }
)

export default service
