<template>
  <div class="page-container">
    <PageHeader title="工作台">
      <template #actions>
        <el-button type="primary">
          <el-icon><Plus /></el-icon>
          新建工作流
        </el-button>
      </template>
    </PageHeader>

    <div class="workspace-container">
      <el-row :gutter="20">
        <el-col :span="8" v-for="i in 3" :key="i">
          <el-card class="workspace-card">
            <template #header>
              <div class="card-header">
                <span>数据分析工作流 {{ i }}</span>
                <el-dropdown>
                  <el-button type="text">
                    <el-icon><More /></el-icon>
                  </el-button>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>编辑</el-dropdown-item>
                      <el-dropdown-item>复制</el-dropdown-item>
                      <el-dropdown-item type="danger">删除</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </template>
            <div class="card-content">
              <p class="description">这是一个示例工作流，用于演示数据分析流程。</p>
              <div class="card-footer">
                <span class="time">更新于：2024-03-19</span>
                <el-button type="primary" link>查看详情</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { Plus, More } from '@element-plus/icons-vue'
import PageHeader from '../components/PageHeader.vue'
</script>

<style scoped>
.page-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.workspace-container {
  flex: 1;
  overflow-y: auto;
}

.workspace-card {
  margin-bottom: 20px;
  transition: all 0.3s;
}

.workspace-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.description {
  color: #606266;
  font-size: 14px;
  margin: 0;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.time {
  color: #909399;
  font-size: 13px;
}

@media screen and (max-width: 768px) {
  .workspace-container {
    padding: 0 12px;
  }
  
  .el-col {
    width: 100%;
  }
}
</style> 