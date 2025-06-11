<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
  ChatLineRound,
  Monitor,
  DataLine,
  Document,
  Fold,
  Expand
} from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const isCollapse = ref(false)
const activeMenu = computed(() => {
  // 如果是根路径，返回 /chat
  if (route.path === '/') {
    return '/chat'
  }
  return route.path
})

const toggleSidebar = () => {
  isCollapse.value = !isCollapse.value
}

const handleLogout = () => {
  localStorage.removeItem('token')
  ElMessage.success('已退出登录')
  router.push('/login')
}
</script>

<template>
  <div class="layout-container">
    <!-- 左侧导航栏 -->
    <div class="sidebar" :class="{ 'sidebar-collapse': isCollapse }">
      <div class="logo">
        <el-icon class="logo-icon" :size="24"><Monitor /></el-icon>
        <h1>混合架构AI系统</h1>
      </div>
      <el-menu
        :default-active="activeMenu"
        class="sidebar-menu"
        router
        :collapse="isCollapse"
      >
        <el-menu-item index="/chat">
          <el-icon><ChatLineRound /></el-icon>
          <span>智能对话</span>
        </el-menu-item>
        <el-menu-item index="/workspace">
          <el-icon><Monitor /></el-icon>
          <span>工作台</span>
        </el-menu-item>
        <el-menu-item index="/data">
          <el-icon><DataLine /></el-icon>
          <span>数据视图</span>
        </el-menu-item>
        <el-menu-item index="/history">
          <el-icon><Document /></el-icon>
          <span>历史记录</span>
        </el-menu-item>
      </el-menu>
    </div>

    <!-- 主内容区 -->
    <div class="main-container">
      <!-- 顶部导航栏 -->
      <div class="header">
        <div class="header-left">
          <el-button
            type="text"
            @click="toggleSidebar"
            class="toggle-button"
          >
            <el-icon><Fold v-if="!isCollapse" /><Expand v-else /></el-icon>
          </el-button>
        </div>
        <div class="header-right">
          <el-dropdown @command="handleLogout">
            <span class="user-profile">
              <el-avatar :size="32" />
              <span class="username">用户名</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>

      <!-- 路由视图 -->
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
.layout-container {
  display: flex;
  height: 100vh;
  background-color: #f5f7fa;
}

.sidebar {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  z-index: 1000;
  width: 240px;
}

.sidebar-collapse {
  width: 64px;
}

.logo {
  display: flex;
  align-items: center;
  padding: 16px;
  height: 60px;
  overflow: hidden;
}

.logo-icon {
  color: var(--el-color-primary);
  margin-right: 8px;
  flex-shrink: 0;
}

.logo h1 {
  font-size: 18px;
  color: #333;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-menu {
  border-right: none;
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.header-right {
  display: flex;
  align-items: center;
}

.user-profile {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.username {
  margin-left: 8px;
  font-size: 14px;
  color: #333;
}

.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.toggle-button {
  padding: 0;
  font-size: 20px;
}

/* 响应式设计 */
@media screen and (max-width: 768px) {
  .sidebar {
    position: fixed;
    height: 100vh;
    transform: translateX(0);
  }

  .sidebar-collapse {
    transform: translateX(-100%);
  }
  
  .logo h1 {
    display: none;
  }

  .main-container {
    margin-left: 0;
  }
}
</style> 