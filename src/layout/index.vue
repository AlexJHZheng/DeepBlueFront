<template>
  <div class="app-wrapper">
    <!-- 侧边栏 -->
    <div class="sidebar-container" :class="{ 'is-collapse': isCollapse }">
      <div class="logo-container">
        <img src="@/assets/logo.svg" class="logo" alt="logo">
        <h1 class="logo-title" v-show="!isCollapse">AI平台</h1>
      </div>
      <el-scrollbar>
        <el-menu
          :default-active="activeMenu"
          background-color="#001529"
          text-color="#fff"
          active-text-color="#409EFF"
          :collapse="isCollapse"
          router
        >
          <el-menu-item index="/ai">
            <el-icon><Monitor /></el-icon>
            <template #title>AI</template>
          </el-menu-item>

          <el-menu-item index="/knowledge">
            <el-icon><Files /></el-icon>
            <template #title>知识库</template>
          </el-menu-item>

          <el-menu-item index="/workflow">
            <el-icon><Connection /></el-icon>
            <template #title>工作流</template>
          </el-menu-item>

          <el-menu-item index="/fengming">
            <el-icon><Platform /></el-icon>
            <template #title>孚盟</template>
          </el-menu-item>

          <el-menu-item index="/jdy">
            <el-icon><Grid /></el-icon>
            <template #title>简道云</template>
          </el-menu-item>

          <el-menu-item index="/wecom">
            <el-icon><ChatDotRound /></el-icon>
            <template #title>企业微信</template>
          </el-menu-item>

          <el-menu-item index="/admin">
            <el-icon><Setting /></el-icon>
            <template #title>管理</template>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
    </div>

    <!-- 主要内容区 -->
    <div class="main-container">
      <!-- 头部 -->
      <div class="navbar">
        <div class="left-menu">
          <el-icon class="fold-btn" @click="toggleSidebar">
            <component :is="isCollapse ? 'Expand' : 'Fold'" />
          </el-icon>
        </div>
        <div class="right-menu">
          <el-dropdown trigger="click">
            <div class="avatar-wrapper">
              <el-avatar :size="32" :src="avatarUrl" />
              <span class="user-name">管理员</span>
              <el-icon><CaretBottom /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handleCommand('profile')">
                  <el-icon><User /></el-icon>个人信息
                </el-dropdown-item>
                <el-dropdown-item @click="handleCommand('logout')">
                  <el-icon><SwitchButton /></el-icon>退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      
      <!-- 内容区 -->
      <div class="app-main">
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import {
  Monitor,
  Files,
  Connection,
  Platform,
  Grid,
  ChatDotRound,
  User,
  SwitchButton,
  CaretBottom,
  Expand,
  Fold,
  Setting
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const isCollapse = ref(false)
const avatarUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')

const activeMenu = computed(() => {
  // 如果是根路径，返回默认的dashboard
  if (route.path === '/') {
    return '/dashboard'
  }
  // 否则返回当前路径
  return route.path
})

const toggleSidebar = () => {
  isCollapse.value = !isCollapse.value
}

const handleCommand = (command) => {
  if (command === 'logout') {
    userStore.logout()
    ElMessage.success('已退出登录')
    router.push('/login')
  }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
  height: 100vh;
  width: 100%;
  display: flex;
  
  .sidebar-container {
    width: 220px;
    height: 100%;
    background: #001529;
    transition: width 0.3s;
    overflow: hidden;
    
    &.is-collapse {
      width: 64px;

      .logo-container {
        padding: 10px;
        justify-content: center;
      }
    }

    .logo-container {
      height: 60px;
      padding: 10px 20px;
      display: flex;
      align-items: center;
      background: rgba(255, 255, 255, 0.05);
      
      .logo {
        width: 40px;
        height: 40px;
      }

      .logo-title {
        margin: 0 0 0 12px;
        color: #fff;
        font-size: 18px;
        font-weight: 600;
        white-space: nowrap;
        opacity: 1;
        transition: opacity 0.3s;
      }
    }

    .el-menu {
      border: none;
    }
  }

  .main-container {
    flex: 1;
    min-height: 100%;
    background: #f0f2f5;
    position: relative;

    .navbar {
      height: 60px;
      overflow: hidden;
      position: relative;
      background: #fff;
      box-shadow: 0 1px 4px rgba(0,21,41,.08);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;

      .left-menu {
        .fold-btn {
          font-size: 20px;
          cursor: pointer;
          transition: background .3s;
          padding: 8px;
          border-radius: 4px;
          
          &:hover {
            background: rgba(0,0,0,.025);
          }
        }
      }

      .right-menu {
        .avatar-wrapper {
          display: flex;
          align-items: center;
          padding: 5px 12px;
          cursor: pointer;
          border-radius: 4px;
          transition: background .3s;
          
          &:hover {
            background: rgba(0,0,0,.025);
          }

          .user-name {
            margin: 0 8px;
            font-size: 14px;
            color: #333;
          }
        }
      }
    }

    .app-main {
      padding: 20px;
      box-sizing: border-box;
      height: calc(100vh - 60px);
      overflow-y: auto;
    }
  }
}

// 过渡动画
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.3s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style> 