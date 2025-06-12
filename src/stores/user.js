import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login, getUserInfo } from '@/api/user'
import { ElMessage } from 'element-plus'
import router from '@/router'

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
  function logout() {
    // 清除本地状态
    token.value = ''
    userInfo.value = null
    localStorage.removeItem('token')
    
    // 提示用户
    ElMessage.success('已退出登录')
    
    // 跳转到登录页
    router.replace('/login')
  }

  return {
    token,
    userInfo,
    loginAction,
    loadUserInfo,
    logout
  }
}) 