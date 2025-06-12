import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

// 创建axios实例
const service = axios.create({
  baseURL: '/api', // 使用相对路径，由 Vite 代理处理
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    const userStore = useUserStore()
    
    // 设置token
    if (userStore.token) {
      config.headers['Authorization'] = `Bearer ${userStore.token}`
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
    console.error('请求错误：', error)
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
    
    // 这里假设后端返回格式为 { code: number, data: any, message: string }
    if (res.code === 200) {
      return res.data
    }
    
    // 处理特定错误码
    if (res.code === 401) {
      // token过期或未登录，调用统一的登出方法
      const userStore = useUserStore()
      userStore.logout()
      return Promise.reject(new Error(res.message || '未授权，请重新登录'))
    }
    
    // 其他错误
    ElMessage.error(res.message || '请求失败')
    return Promise.reject(new Error(res.message || '请求失败'))
  },
  error => {
    console.error('响应错误：', error)
    
    // 处理网络错误
    if (!error.response) {
      ElMessage.error('网络错误，请检查您的网络连接')
      return Promise.reject(error)
    }

    // 处理 401 错误
    if (error.response.status === 401) {
      const userStore = useUserStore()
      userStore.logout()
      return Promise.reject(new Error('未授权，请重新登录'))
    }

    // 处理其他错误
    ElMessage.error(error.response?.data?.message || '请求失败')
    return Promise.reject(error)
  }
)

export default service 