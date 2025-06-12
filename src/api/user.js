import request from '@/utils/request'
import { ElMessage } from 'element-plus'

// 创建axios实例
const service = request.create({
  baseURL: '/api', // 修改为相对路径，使用 vite 的代理
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 200) {
      return res.data
    }
    // 让具体的业务组件处理错误
    return Promise.reject(res)
  },
  error => {
    // 不在这里显示错误消息，让具体的业务组件处理错误
    return Promise.reject(error)
  }
)

/**
 * 用户登录
 * @param {Object} data 登录信息
 * @returns Promise
 */
export function login(data) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

/**
 * 获取用户信息
 * @returns Promise
 */
export function getUserInfo() {
  return request({
    url: '/api/user/info',
    method: 'get'
  })
}

/**
 * 修改密码
 * @param {Object} data 密码信息
 * @returns Promise
 */
export function updatePassword(data) {
  return request({
    url: '/api/user/password',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      userId: data.userId,
      newPassword: data.newPassword
    }
  })
}

/**
 * 退出登录
 * @returns Promise
 */
export function logout() {
  return request({
    url: '/api/user/logout',
    method: 'post'
  })
}

export default service 