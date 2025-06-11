<template>
  <div class="knowledge-container">
    <el-card class="page-card">
      <template #header>
        <div class="card-header">
          <span>知识库</span>
        </div>
      </template>
      <div class="content">
        <h3>欢迎使用知识库</h3>
        <p>这里是知识库的主页面</p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
// 知识库页面逻辑
</script>

<style lang="scss" scoped>
.knowledge-container {
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