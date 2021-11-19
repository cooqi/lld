import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { Toast } from 'vant'

// import Qs from 'qs'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // VUE_APP_BASE_API_clf
  withCredentials: true // send cookies when cross-domain requests
  // timeout: 5000 // request timeout
  // formdata格式
  // transformRequest: [function (data) {
  //   data = Qs.stringify(data);//序列化
  //   return data
  // }]
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers.uiticket = getToken()
      // config.headers['sid'] = getSid() || ''

      // 加默认参数
      // if (config.method === 'post') {
      //   config.data = {
      //     ...config.data,
      //     roleid: 1
      //   }
      // } else if (config.method === 'get') {
      //   config.params = {
      //     roleid: 1,
      //     ...config.params
      //   }
      // }
    }
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
    // let sid = response.headers['sid']

    // if(!!sid){
    //   store.dispatch('user/setSidVal',sid)
    // }
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      Toast({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res.result
    }
  },
  error => {
    console.log('err' + error) // for debug
    if (error.response) {
      switch (error.response.status) {
        case 401:
          Toast({
            message: '登录凭证已经失效请重新登录', // error.message
            type: 'error',
            duration: 3000
          })

          break
        case 403:
          // 返回 403 提示无权限
          Toast({
            message: '您没有权限访问', // error.message
            type: 'error',
            duration: 3 * 1000
          })
          break
        default:
          Toast({
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
