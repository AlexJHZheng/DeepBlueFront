import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

// 创建axios实例
const service = axios.create({
  baseURL: '/api', // 使用 vite 的代理
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    // 添加请求日志
    console.log('Request:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data
    })
    return config
  },
  error => {
    console.error('Request Error:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 添加响应日志
    console.log('Response:', {
      status: response.status,
      data: response.data,
      headers: response.headers
    })

    const res = response.data
    
    if (res.code === 200) {
      return res.data
    }
    
    // 处理特定错误码
    if (res.code === 401) {
      // token过期，清除用户信息并跳转到登录页
      const userStore = useUserStore()
      userStore.logout()
      window.location.href = '/login'
      return Promise.reject(new Error(res.message || '未授权，请重新登录'))
    }
    
    // 其他错误
    ElMessage.error(res.message || '请求失败')
    return Promise.reject(new Error(res.message || '请求失败'))
  },
  error => {
    // 添加错误日志
    console.error('Response Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    })
    ElMessage.error(error.response?.data?.message || '请求失败')
    return Promise.reject(error)
  }
)

export default service 