import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建axios实例
const service = axios.create({
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

// 登录接口
export function login(data) {
  return service({
    url: '/auth/login',
    method: 'post',
    data
  })
}

// 获取用户信息接口
export function getUserInfo() {
  return service({
    url: '/auth/info',
    method: 'get'
  })
}

// 退出登录
export function logout() {
  return service({
    url: '/auth/logout',
    method: 'post'
  })
}

export default service 