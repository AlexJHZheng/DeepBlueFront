import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

// 创建axios实例
const service = axios.create({
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    const userStore = useUserStore()
    // 设置通用的Content-Type
    config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json'
    
    // 设置token
    if (userStore.token) {
      config.headers['Authorization'] = `Bearer ${userStore.token}`
    }
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
    const res = response.data
    
    // 这里假设后端返回格式为 { code: number, data: any, message: string }
    if (res.code === 200) {
      return res.data
    }
    
    // 处理特定错误码
    if (res.code === 401) {
      // token过期或未登录
      const userStore = useUserStore()
      userStore.logout()
    }
    
    // 返回错误信息，让组件自行处理错误提示
    return Promise.reject(new Error(res.message || '请求失败'))
  },
  error => {
    console.error('响应错误：', error)
    // 返回错误信息，让组件自行处理错误提示
    return Promise.reject(error)
  }
)

export default service 