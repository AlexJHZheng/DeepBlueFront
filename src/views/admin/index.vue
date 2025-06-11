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
      <router-view></router-view>
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
  
  .admin-header {
    background-color: #fff;
    border-bottom: 1px solid #dcdfe6;
    
    .admin-menu {
      height: 60px;
      padding: 0 20px;
      
      :deep(.el-menu-item) {
        height: 60px;
        line-height: 60px;
        
        .el-icon {
          margin-right: 5px;
        }
      }
    }
  }
  
  .admin-content {
    flex: 1;
    padding: 20px;
    background-color: #f5f7fa;
    overflow-y: auto;
  }
}
</style> 