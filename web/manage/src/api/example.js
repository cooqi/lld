import request from '@/utils/request'
import API from '@/utils/API'

// 为了避免反复横跳，不建议把url单独定义在全局

// 注意 请求三种情况，post-body  get-query post-query,第一种方法里尤其注意post-query的传参字段

// 提供了三种写法，可选其一使用，但是！严禁！一个文件里出现多种写法
// 第一种写法
export function post (data) { // post-body（常规post）
  return request({
    url: 'xxx.do',
    method: 'post',
    data: data
  })
}

export function get (query) { // get-query（常规query）
  return request({
    url: 'xxx.do',
    method: 'get',
    params: query
  })
}

export function postQuery (data) { // post-query(非常规)
  return request({
    url: 'xxx.do',
    method: 'post',
    params: data
  })
}

// 第二种写法

export function post2 (data) {
  return API.post('xxx.do', data)
}

export function get2 (data) {
  return API.get('xxx.do', data)
}

export function postQuery2 (data) {
  return API.postQuery('xxx.do', data)
}

export function upload2 (data) {
  return API.post('xxx.do', data,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
}

// 第三种写法
export class example {
  static post3 (data) {
    return API.post('xxx.do', data)
  }
}
