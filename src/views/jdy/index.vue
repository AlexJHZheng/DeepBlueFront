<template>
  <div class="jdy-container">
    <el-card class="page-card">
      <template #header>
        <div class="card-header">
          <span>简道云</span>
        </div>
      </template>
      <div class="content">
        <h3>欢迎使用简道云</h3>
        <p>这里是简道云的主页面</p>
      </div>
    </el-card>
  </div>
</template>

<script setup>
// 简道云页面逻辑
</script>

<style lang="scss" scoped>
.jdy-container {
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