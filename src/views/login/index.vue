<template>
  <div class="login-container">
    <div class="login-content">
      <div class="login-left">
        <img src="@/assets/login-illustration.svg" alt="登录插画" class="login-image" />
      </div>
      <div class="login-box">
        <h2 class="title">深蓝AI平台</h2>
        <p class="subtitle">智能化解决方案</p>
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
        >
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="用户名"
              :prefix-icon="User"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="密码"
              :prefix-icon="Lock"
              @keyup.enter="handleLogin"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              type="primary"
              class="login-button"
              @click="handleLogin"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const loading = ref(false)
const loginFormRef = ref(null)

const loginForm = reactive({
  username: '',
  password: ''
})

const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
}

const handleLogin = async () => {
  if (!loginFormRef.value) return

  try {
    await loginFormRef.value.validate()
    loading.value = true
    await userStore.loginAction(loginForm)
    
    ElMessage({
      message: '登录成功',
      type: 'success'
    })

    const redirect = route.query.redirect || '/'
    router.replace(redirect)
  } catch (error) {
    console.error('登录失败：', error)
    ElMessage.error('登录失败：' + (error.message || '未知错误'))
  } finally {
    loading.value = false
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
  padding: 20px;
}

.login-content {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  overflow: hidden;
  max-width: 1000px;
  width: 90%;
}

.login-left {
  flex: 1;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.5);
}

.login-image {
  max-width: 100%;
  height: auto;
  object-fit: contain;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.login-box {
  width: 400px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.95);

  .title {
    text-align: center;
    margin-bottom: 10px;
    color: #303133;
    font-size: 28px;
    font-weight: 600;
  }

  .subtitle {
    text-align: center;
    margin-bottom: 30px;
    color: #606266;
    font-size: 16px;
  }

  .login-form {
    .el-input {
      margin-bottom: 20px;
    }

    .login-button {
      width: 100%;
      height: 44px;
      font-size: 16px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      transition: all 0.3s ease;

      &:hover {
        opacity: 0.9;
        transform: translateY(-1px);
      }

      &:active {
        transform: translateY(0);
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .login-content {
    flex-direction: column;
    width: 100%;
    max-width: 400px;
  }

  .login-left {
    padding: 20px;
    width: 100%;
  }

  .login-box {
    width: 100%;
  }

  .login-image {
    max-height: 200px;
  }
}
</style> 