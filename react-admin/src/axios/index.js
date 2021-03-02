/* eslint-disable no-param-reassign */
/**
 *
 * ajax全局配置
 *
 */
import axios from 'axios'
import { message } from 'antd'
import qs from 'qs'

const token = `Bearer ${localStorage.getItem('token')}`
// let hide = null

// axios 配置
const service = axios.create({
  timeout: 10000,
  withCredentials: true, // 允许跨域带token
  baseURL: '/api'
})
// axios.defaults.baseURL = '/api'
//  axios.defaults.headers.Authorization = localStorage.token || null
// axios.defaults.timeout = 10000 // 响应时间
// axios.defaults.headers['Content-Type'] = 'application/json;charse=UTF-8'
// axios.defaults.withCredentials = true
// axios.defaults.crossDomain = true

// http request 拦截器
service.interceptors.request.use(
  config => {
    // 设置token信息
    config.headers.Authorization = token || null
    // hide = message.loading('加载中', 0)

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// // http response 拦截器:返回状态判断（添加响应拦截器）
service.interceptors.response.use(
  response => {
    if (response.data.code === 40008) {
      // 40008 说明 token 验证失败
      message.error('获取token失败')
      // 可以直接跳转到登录页面，重新登录获取 token
      window.location.reload() // 刷新页面，如果该页面需要登录，则会自动跳转到登录页面
      return {
        code: 12000,
        message: '登录过时,退出请重新登录'
      }
    }
    // hide()

    return response.data
  },
  error => {
    // 捕获错误
    if (error.message.indexOf('timeout') !== -1) {
      message.error('请求超时')
    }
    if (error.message.indexOf('404') !== -1) {
      message.error('请求异常')
    }
    return Promise.reject(error.response) // 返回接口返回的错误信息
  }
)

export default {
  postJson(url, param) {
    return new Promise((resolve, reject) => {
      service({
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'post',
        url,
        data: param
      })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  post(url, param) {
    return new Promise((resolve, reject) => {
      service({
        method: 'post',
        url,
        data: qs.stringify(param)
      })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  post2(url, param) {
    return new Promise((resolve, reject) => {
      service({
        method: 'post',
        url,
        data: param
      })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  get(url, param) {
    return new Promise((resolve, reject) => {
      service({
        method: 'get',
        url,
        params: param
      })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  outExcel(url, param) {
    return new Promise(resolve => {
      service({
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'post',
        url,
        responseType: 'blob',
        data: param
      })
        .then(res => {
          // axios返回的是一个promise对象
          resolve(res) // resolve在promise执行器内部
        })
        .catch(err => {
          console.log(err)
          console.log(err, '异常')
        })
    })
  }
}
