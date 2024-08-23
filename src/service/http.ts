import { message } from 'antd'
import qs from 'qs'
//判断网络请求状态
const checkIntStatus = (response: any) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  message.error('网络请求错误')
  throw new Error(response.statusText)
}
//判断返回结果状态
const checkResStatus = async (response: any) => {
  const res = await response.clone().json()
  console.log(res)
  if (res.code !== 0) {
    if (res.msg) message.error(res.msg)
  }
  return response
}
//设置token
const setToken = (response: any) => {
  const token = response.headers && response.headers.get('Authorization')
  if (token) {
    sessionStorage.setItem('token', token)
  }
  return response.json()
}
class Http {
  static fetch(url: string, options: any = {}) {
    url = `/api${url}`
    const defaultOptions = {
      mode: 'cors',
      headers: {},
    }
    const token = sessionStorage.getItem('token')
    if (token) {
      defaultOptions.headers['Authorization'] = token
    }
    if (options.method === 'POST' || options.method === 'PUT') {
      defaultOptions.headers['Content-Type'] = 'application/json;charset=utf-8'
    }
    options = Object.assign(defaultOptions, options)
    return fetch(url, options)
      .then(checkIntStatus)
      .then(checkResStatus)
      .then(setToken)
      .catch(error => {
        console.log('请求错误', error)
      })
  }
  post(url: string, data: any = {}, options = {}) {
    options = Object.assign(options, { method: 'POST' })
    if (data) {
      options.body = JSON.stringify(data)
    }
    return Http.fetch(url, options)
  }
  put(url: string, data: any = {}, options = {}) {
    options = Object.assign(options, { method: 'PUT' })
    if (data) {
      options.body = JSON.stringify(data)
    }
    return Http.fetch(url, options)
  }
  get(url: string, options = {}) {
    options = Object.assign(options, { method: 'GET' })
    if (Object.keys(options).length > 0) {
      url = `${url}?${qs.stringify(options)}`
    }
    return Http.fetch(url, options)
  }
  del(url: string, options = {}) {
    options = Object.assign(options, { method: 'DELETE' })
    if (Object.keys(options).length > 0) {
      url = `${url}?${qs.stringify(options)}`
    }
    return Http.fetch(url, options)
  }
}

export default new Http()
