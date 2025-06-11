<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock, Monitor } from '@element-plus/icons-vue'

const router = useRouter()
const form = ref({
  username: '',
  password: ''
})
const rememberMe = ref(false)

const handleLogin = () => {
  if (!form.value.username || !form.value.password) {
    ElMessage.warning('请输入用户名和密码')
    return
  }
  
  // 这里模拟登录成功
  localStorage.setItem('token', 'demo-token')
  ElMessage.success('登录成功')
  router.push('/')
}
</script>

<template>
  <div class="login-container">
    <div class="background-animation">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
    </div>
    
    <div class="login-box glass-effect">
      <div class="login-header">
        <div class="logo animate-float">
          <el-icon :size="40" class="text-gradient"><Monitor /></el-icon>
        </div>
        <h2 class="text-gradient">混合架构AI系统</h2>
        <p class="subtitle">智能化数据分析平台</p>
      </div>

      <el-form :model="form" class="login-form" @submit.prevent>
        <el-form-item>
          <el-input
            v-model="form.username"
            placeholder="用户名"
            :prefix-icon="User"
            class="custom-input"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.password"
            type="password"
            placeholder="密码"
            :prefix-icon="Lock"
            show-password
            class="custom-input"
            @keyup.enter="handleLogin"
          />
        </el-form-item>
        <el-form-item>
          <div class="flex-between mb-4">
            <el-checkbox v-model="rememberMe">记住我</el-checkbox>
            <el-button type="text" class="forget-btn">忘记密码？</el-button>
          </div>
          <el-button type="primary" class="login-button gradient-button" @click="handleLogin">
            <span class="relative z-10">登录</span>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.background-animation {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.5;
  animation: float 6s ease-in-out infinite;
}

.circle-1 {
  width: 300px;
  height: 300px;
  background: #8b5cf6;
  top: -100px;
  right: -100px;
  animation-delay: 0s;
}

.circle-2 {
  width: 400px;
  height: 400px;
  background: #3b82f6;
  bottom: -150px;
  left: -150px;
  animation-delay: -2s;
}

.circle-3 {
  width: 200px;
  height: 200px;
  background: #6366f1;
  top: 50%;
  right: 15%;
  animation-delay: -4s;
}

.login-box {
  width: 400px;
  padding: 40px;
  border-radius: var(--border-radius-lg);
  z-index: 1;
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
}

.logo {
  margin-bottom: 20px;
}

.logo :deep(.el-icon) {
  font-size: 48px;
}

h2 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 8px;
}

.subtitle {
  color: #64748b;
  font-size: 16px;
}

.custom-input {
  --el-input-bg-color: rgba(255, 255, 255, 0.5);
  --el-input-border-color: rgba(255, 255, 255, 0.2);
  --el-input-hover-border-color: rgba(255, 255, 255, 0.3);
  --el-input-focus-border-color: var(--el-color-primary);
}

.custom-input :deep(.el-input__wrapper) {
  box-shadow: none;
  backdrop-filter: blur(4px);
}

.login-button {
  width: 100%;
  height: 44px;
  font-size: 16px;
  border-radius: var(--border-radius);
  overflow: hidden;
  position: relative;
}

.login-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: 0.5s;
}

.login-button:hover::before {
  left: 100%;
}

.forget-btn {
  color: var(--el-color-primary);
  font-size: 14px;
}

.mb-4 {
  margin-bottom: 16px;
}

@media screen and (max-width: 768px) {
  .login-box {
    width: 90%;
    margin: 0 20px;
    padding: 30px 20px;
  }

  .circle {
    filter: blur(60px);
  }
}
</style> 