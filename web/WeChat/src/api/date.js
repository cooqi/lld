import request from '@/utils/request'

export function getListToTime (query) { // 获取事件所有的时间用于渲染日历
  return request({
    url: '/web/getListToTime',
    method: 'get',
    params: query
  })
}

export function getAnniversaryByMD (query) { // 获取当天周年内容
  return request({
    url: '/web/getAnniversaryByMD',
    method: 'get',
    params: query
  })
}

export function getDataAboutToday (query) { // 获取当天day相关内容
  return request({
    url: '/web/getDataAboutToday',
    method: 'get',
    params: query
  })
}

export function getList (query) { // 搜索
  return request({
    url: '/web/getList',
    method: 'get',
    params: query
  })
}
