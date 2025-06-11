import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login, getUserInfo } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref({})
  const roles = ref([])
  const permissions = ref([])

  // 登录
  const handleLogin = async (loginForm) => {
    try {
      const data = await login(loginForm)
      token.value = data.token
      localStorage.setItem('token', data.token)
      
      // 保存用户信息
      userInfo.value = data.user
      roles.value = data.roles
      permissions.value = data.permissions
      
      return data
    } catch (error) {
      console.error('登录失败:', error)
      throw error
    }
  }

  // 获取用户信息
  const loadUserInfo = async () => {
    try {
      const data = await getUserInfo()
      userInfo.value = data.user
      roles.value = data.roles
      permissions.value = data.permissions
      return data
    } catch (error) {
      console.error('获取用户信息失败:', error)
      throw error
    }
  }

  // 登出
  const logout = () => {
    // 清除状态
    token.value = ''
    userInfo.value = {}
    roles.value = []
    permissions.value = []
    // 清除本地存储
    localStorage.removeItem('token')
  }

  return {
    token,
    userInfo,
    roles,
    permissions,
    handleLogin,
    loadUserInfo,
    logout
  }
}) 