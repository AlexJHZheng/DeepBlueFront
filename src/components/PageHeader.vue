<template>
  <div class="page-header">
    <div class="header-left">
      <h2 class="page-title">{{ title }}</h2>
      <div class="breadcrumb" v-if="showBreadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="header-right">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  showBreadcrumb: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped>
.page-header {
  margin-bottom: 20px;
  padding: 16px 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.page-title {
  font-size: 20px;
  color: #1f2f3d;
  margin: 0;
  font-weight: 500;
}

.breadcrumb {
  color: #909399;
  font-size: 13px;
}

@media screen and (max-width: 768px) {
  .page-header {
    padding: 12px 16px;
    margin-bottom: 16px;
  }

  .page-title {
    font-size: 18px;
  }

  .breadcrumb {
    display: none;
  }
}
</style> 