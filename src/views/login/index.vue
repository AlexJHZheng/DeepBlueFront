<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <img src="@/assets/logo.svg" class="logo" alt="logo">
        <h2>AI平台</h2>
      </div>
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            :prefix-icon="User"
            @keyup.enter="handleLogin"
          />
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            :type="passwordVisible ? 'text' : 'password'"
            :prefix-icon="Lock"
            :suffix-icon="passwordVisible ? View : Hide"
            @click-suffix="passwordVisible = !passwordVisible"
            @keyup.enter="handleLogin"
          />
        </el-form-item>

        <el-form-item>
          <el-button :loading="loading" type="primary" class="login-button" @click="handleLogin">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { User, Lock, View, Hide } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const loginFormRef = ref(null)
const loading = ref(false)
const passwordVisible = ref(false)

const loginForm = reactive({
  username: '',
  password: ''
})

const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, message: '用户名长度不能小于3个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6个字符', trigger: 'blur' }
  ]
}

const handleLogin = async () => {
  try {
    await loginFormRef.value.validate()
    
    await userStore.handleLogin(loginForm)
    ElMessage.success('登录成功')
    
    // 获取重定向地址或默认跳转到首页
    const redirectPath = route.query.redirect || '/'
    router.push(redirectPath)
  } catch (error) {
    if (error.response?.data?.message) {
      ElMessage.error(error.response.data.message)
    } else {
      ElMessage.error('登录失败，请检查用户名和密码')
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  .login-box {
    width: 400px;
    padding: 40px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    .login-header {
      text-align: center;
      margin-bottom: 40px;

      .logo {
        width: 84px;
        height: 84px;
        margin-bottom: 16px;
      }

      h2 {
        margin: 0;
        font-size: 24px;
        color: #333;
        font-weight: 500;
      }
    }

    .login-form {
      .el-input {
        --el-input-height: 42px;
      }

      .login-button {
        width: 100%;
        height: 42px;
      }
    }
  }
}
</style> 