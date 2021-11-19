import request from '@/utils/request'

export function login (data) { // 登录
  return request({
    url: 'frame/index/login.do',
    method: 'post',
    data
  })
}

export function getInfo (token) { // 获取用户信息
  return request({
    url: 'frame/index/getUser.do',
    method: 'get'
  })
}

// 注意 请求三种情况，post-body  get-query post-query,尤其注意post-query的传参字段
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
