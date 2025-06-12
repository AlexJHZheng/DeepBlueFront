import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login, getUserInfo, logout as userLogout } from '@/api/user'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref(null)

  // 登录
  async function loginAction(loginData) {
    try {
      const data = await login(loginData)
      token.value = data.token
      localStorage.setItem('token', data.token)
      return data
    } catch (error) {
      console.error('登录失败：', error)
      throw error
    }
  }

  // 获取用户信息
  async function loadUserInfo() {
    try {
      const data = await getUserInfo()
      userInfo.value = data
      return data
    } catch (error) {
      console.error('获取用户信息失败：', error)
      throw error
    }
  }

  // 退出登录
  async function logout() {
    try {
      await userLogout()
    } catch (error) {
      console.error('退出登录失败：', error)
    } finally {
      // 无论是否成功都清除本地状态
      token.value = ''
      userInfo.value = null
      localStorage.removeItem('token')
    }
  }

  return {
    token,
    userInfo,
    loginAction,
    loadUserInfo,
    logout
  }
}) 