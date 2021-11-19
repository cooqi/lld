
import request from '@/utils/request'

export function upload (data) { // upload
  return request({
    url: 'xxx.do',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
