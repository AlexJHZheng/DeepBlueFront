<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>用户总数</span>
            </div>
          </template>
          <div class="card-body">
            <h2>128</h2>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>今日活跃</span>
            </div>
          </template>
          <div class="card-body">
            <h2>32</h2>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>系统消息</span>
            </div>
          </template>
          <div class="card-body">
            <h2>12</h2>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>待处理任务</span>
            </div>
          </template>
          <div class="card-body">
            <h2>5</h2>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="mt-20">
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>系统公告</span>
            </div>
          </template>
          <div class="notice-list">
            <div v-for="i in 4" :key="i" class="notice-item">
              <span class="notice-title">系统更新通知 {{ i }}</span>
              <span class="notice-time">2024-03-{{ i.toString().padStart(2, '0') }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>快捷操作</span>
            </div>
          </template>
          <div class="quick-actions">
            <el-button type="primary" plain>用户管理</el-button>
            <el-button type="success" plain>角色配置</el-button>
            <el-button type="warning" plain>权限设置</el-button>
            <el-button type="info" plain>系统设置</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
// 仪表盘数据和方法可以在这里添加
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 20px;
  
  .el-card {
    margin-bottom: 20px;
    
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .card-body {
      text-align: center;
      padding: 20px 0;
      
      h2 {
        margin: 0;
        font-size: 28px;
        color: #409EFF;
      }
    }
  }
  
  .mt-20 {
    margin-top: 20px;
  }
  
  .notice-list {
    .notice-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
      
      &:last-child {
        border-bottom: none;
      }
      
      .notice-title {
        color: #606266;
      }
      
      .notice-time {
        color: #909399;
        font-size: 13px;
      }
    }
  }
  
  .quick-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    
    .el-button {
      min-width: 120px;
    }
  }
}
</style> 