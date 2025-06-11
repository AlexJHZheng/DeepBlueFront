import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:3000', // API的base_url
  timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    // 对请求错误做些什么
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // 根据自定义错误码判断请求是否成功
    if (res.code === 200) {
      return res
    } else {
      // 错误提示
      ElMessage.error(res.message || '系统错误')
      return Promise.reject(new Error(res.message || '系统错误'))
    }
  },
  error => {
    console.log('err' + error)
    // 错误提示
    ElMessage.error(error.message || '请求失败')
    return Promise.reject(error)
  }
)

export default service 