<template>
  <div class="admin-container">
    <div class="admin-header">
      <el-menu
        :default-active="activeMenu"
        class="admin-menu"
        mode="horizontal"
        router
      >
        <el-menu-item index="/admin/role">
          <el-icon><Setting /></el-icon>
          <span>角色管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/user">
          <el-icon><User /></el-icon>
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/permission">
          <el-icon><Key /></el-icon>
          <span>权限管理</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="admin-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Setting, User, Key } from '@element-plus/icons-vue'

const route = useRoute()
const activeMenu = computed(() => route.path)
</script>

<style lang="scss" scoped>
.admin-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f6f8fc;
  
  .admin-header {
    background: linear-gradient(135deg, #fff, #f8faff);
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.03);
    
    .admin-menu {
      height: 64px;
      padding: 0 24px;
      border: none;
      
      :deep(.el-menu-item) {
        height: 64px;
        line-height: 64px;
        padding: 0 24px;
        font-size: 15px;
        transition: all 0.3s ease;
        
        .el-icon {
          margin-right: 8px;
          font-size: 18px;
          transition: all 0.3s ease;
        }
        
        &:hover {
          background-color: #f8faff;
          color: var(--el-color-primary);
          transform: translateY(-2px);
          
          .el-icon {
            transform: scale(1.1);
          }
        }
        
        &.is-active {
          font-weight: 500;
          color: var(--el-color-primary);
          background: linear-gradient(to right, var(--el-color-primary-light-8), transparent);
          border-bottom: 2px solid var(--el-color-primary);
          
          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: var(--el-color-primary);
          }
        }
      }
    }
  }
  
  .admin-content {
    flex: 1;
    padding: 24px;
    overflow-y: auto;
    
    :deep(.el-card) {
      border-radius: 12px;
      border: none;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
      }
      
      .el-card__header {
        padding: 20px 24px;
        border-bottom: 1px solid #eef2f8;
        font-size: 16px;
        font-weight: 500;
      }
      
      .el-card__body {
        padding: 24px;
      }
    }
    
    :deep(.el-table) {
      border-radius: 8px;
      overflow: hidden;
      
      th {
        background-color: #f8faff !important;
        font-weight: 500;
        color: #1a1a1a;
        padding: 16px 24px;
        
        &.is-leaf {
          border-bottom: 1px solid #eef2f8;
        }
      }
      
      td {
        padding: 16px 24px;
        color: #4a5568;
      }
      
      tr {
        transition: all 0.3s ease;
        
        &:hover > td {
          background-color: #f8faff !important;
        }
      }
    }
    
    :deep(.el-pagination) {
      margin-top: 24px;
      justify-content: flex-end;
      padding: 0;
    }
    
    :deep(.el-button) {
      border-radius: 6px;
      padding: 10px 20px;
      font-weight: 500;
      transition: all 0.3s ease;
      
      &:not(.is-text) {
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        
        &:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
      }
      
      &.el-button--primary {
        background: linear-gradient(135deg, var(--el-color-primary), var(--el-color-primary-light-3));
      }
    }
  }
}

// 过渡动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// 深色模式适配
@media (prefers-color-scheme: dark) {
  .admin-container {
    background-color: #141414;
    
    .admin-header {
      background: linear-gradient(135deg, #1a1a1a, #1f1f1f);
      border-bottom-color: rgba(255, 255, 255, 0.05);
      
      .admin-menu {
        :deep(.el-menu-item) {
          &:hover {
            background-color: #1f1f1f;
          }
          
          &.is-active {
            background: linear-gradient(to right, rgba(var(--el-color-primary-rgb), 0.2), transparent);
          }
        }
      }
    }
    
    .admin-content {
      :deep(.el-card) {
        background-color: #1a1a1a;
        
        .el-card__header {
          border-bottom-color: #2c2c2c;
        }
      }
      
      :deep(.el-table) {
        th {
          background-color: #1f1f1f !important;
          color: #fff;
          border-bottom-color: #2c2c2c;
        }
        
        td {
          color: #a0aec0;
        }
        
        tr:hover > td {
          background-color: #1f1f1f !important;
        }
      }
    }
  }
}
</style> 