import request from '@/utils/request-authority'
export function download (data) { // download文件流
  return request({
    url: 'xxx.do',
    method: 'post',
    data,
    responseType: 'blob'
  })
}
