import request from '@/utils/request'

export function addData (data) { // 添加
  return request({
    url: '/web/addData',
    method: 'post',
    data: data
  })
}

export function deleteData (data) { // 删除
  return request({
    url: '/web/deleteData',
    method: 'post',
    data: data
  })
}

export function modifyData (data) { // 修改
  return request({
    url: '/web/modifyData',
    method: 'post',
    data: data
  })
}

export function getList (query) { // 获取列表
  return request({
    url: '/web/getList',
    method: 'get',
    params: query
  })
}

export function getDateById (query) { // 获取当天相关内容
  return request({
    url: '/web/getDateById',
    method: 'get',
    params: query
  })
}

export function typeDict (query) { // 获取type字典
  return request({
    url: '/web/typeDict',
    method: 'get',
    params: query
  })
}
