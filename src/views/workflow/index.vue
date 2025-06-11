<template>
  <div class="workflow-container">
    <el-card class="page-card">
      <template #header>
        <div class="card-header">
          <span>工作流</span>
        </div>
      </template>
      <div class="content">
        <h3>欢迎使用工作流</h3>
        <p>这里是工作流的主页面</p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
// 工作流页面逻辑
</script>

<style lang="scss" scoped>
.workflow-container {
  .page-card {
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .content {
      padding: 20px 0;
      
      h3 {
        margin-top: 0;
        color: #333;
      }
      
      p {
        color: #666;
        line-height: 1.6;
      }
    }
  }
}
</style> 