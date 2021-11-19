
import request from './request'
function API () {
  API.prototype.get = (url, params, config) => {
    return request({
      url,
      method: 'get',
      params,
      ...config
    })
  }
  API.prototype.post = (url, data, config) => {
    return request({
      url,
      method: 'post',
      data,
      ...config
    })
  }
  API.prototype.postQuery = (url, data, config) => {
    return request({
      url,
      method: 'post',
      params: data,
      ...config
    })
  }
}

export default new API()
