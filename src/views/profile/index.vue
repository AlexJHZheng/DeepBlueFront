<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { updatePassword } from '@/api/user'

const router = useRouter()
const userStore = useUserStore()
const userInfo = ref(null)
const loading = ref(false)

// 修改密码相关
const passwordFormVisible = ref(false)
const passwordForm = ref({
  password: '',
  confirmPassword: ''
})
const passwordFormRef = ref(null)
const passwordRules = {
  password: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6个字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== passwordForm.value.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

const loadProfile = async () => {
  try {
    loading.value = true
    await userStore.loadUserInfo()
    userInfo.value = userStore.userInfo
  } catch (error) {
    console.error('获取用户信息失败：', error)
    ElMessage.error('获取用户信息失败：' + (error.message || '未知错误'))
  } finally {
    loading.value = false
  }
}

const handleUpdatePassword = async () => {
  if (!passwordFormRef.value) return
  
  try {
    await passwordFormRef.value.validate()
    loading.value = true
    
    const params = {
      userId: userInfo.value.userId,
      newPassword: passwordForm.value.password
    }
    
    await updatePassword(params)
    
    ElMessage.success('密码修改成功')
    passwordFormVisible.value = false
    // 清空表单
    passwordForm.value = {
      password: '',
      confirmPassword: ''
    }
  } catch (error) {
    console.error('修改密码失败：', error)
    ElMessage.error(error.response?.data?.message || '修改密码失败')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadProfile()
})
</script>

<template>
  <div class="profile-container">
    <el-card v-loading="loading">
      <template #header>
        <div class="card-header">
          <span>个人信息</span>
          <div class="header-actions">
            <el-button type="primary" link @click="passwordFormVisible = true">
              修改密码
            </el-button>
            <el-button type="primary" link @click="loadProfile">刷新</el-button>
          </div>
        </div>
      </template>
      
      <el-descriptions v-if="userInfo" :column="1" border>
        <el-descriptions-item label="用户ID">
          {{ userInfo.userId }}
        </el-descriptions-item>
        <el-descriptions-item label="用户名">
          {{ userInfo.username }}
        </el-descriptions-item>
        <el-descriptions-item label="昵称">
          {{ userInfo.nickname }}
        </el-descriptions-item>
        <el-descriptions-item label="邮箱">
          {{ userInfo.email }}
        </el-descriptions-item>
        <el-descriptions-item label="手机">
          {{ userInfo.phone }}
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">
          {{ userInfo.createTime }}
        </el-descriptions-item>
      </el-descriptions>

      <el-empty v-else description="暂无数据" />
    </el-card>

    <!-- 修改密码对话框 -->
    <el-dialog
      v-model="passwordFormVisible"
      title="修改密码"
      width="500px"
      :close-on-click-modal="false"
    >
      <el-form
        ref="passwordFormRef"
        :model="passwordForm"
        :rules="passwordRules"
        label-width="100px"
      >
        <el-form-item label="新密码" prop="password">
          <el-input
            v-model="passwordForm.password"
            type="password"
            placeholder="请输入新密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="passwordForm.confirmPassword"
            type="password"
            placeholder="请确认新密码"
            show-password
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="passwordFormVisible = false">取消</el-button>
          <el-button type="primary" :loading="loading" @click="handleUpdatePassword">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.profile-container {
  padding: 20px;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-actions {
      display: flex;
      gap: 12px;
    }
  }

  :deep(.el-descriptions) {
    padding: 20px;
  }
}

.dialog-footer {
  padding-top: 20px;
  text-align: right;
}
</style> 