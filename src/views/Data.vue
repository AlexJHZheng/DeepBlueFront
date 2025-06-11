<template>
  <div class="page-container">
    <PageHeader title="数据视图">
      <template #actions>
        <el-button-group>
          <el-button type="primary">
            <el-icon><Upload /></el-icon>
            导入数据
          </el-button>
          <el-button type="primary">
            <el-icon><Plus /></el-icon>
            新建视图
          </el-button>
        </el-button-group>
      </template>
    </PageHeader>

    <div class="data-container">
      <el-tabs type="border-card">
        <el-tab-pane label="数据概览">
          <el-empty description="暂无数据">
            <el-button type="primary">上传数据</el-button>
          </el-empty>
        </el-tab-pane>
        <el-tab-pane label="数据分析">
          <div class="chart-container">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-card class="chart-card">
                  <template #header>
                    <div class="card-header">
                      <span>数据趋势</span>
                      <el-button type="text">
                        <el-icon><Refresh /></el-icon>
                      </el-button>
                    </div>
                  </template>
                  <div class="chart-placeholder">
                    图表区域
                  </div>
                </el-card>
              </el-col>
              <el-col :span="12">
                <el-card class="chart-card">
                  <template #header>
                    <div class="card-header">
                      <span>数据分布</span>
                      <el-button type="text">
                        <el-icon><Refresh /></el-icon>
                      </el-button>
                    </div>
                  </template>
                  <div class="chart-placeholder">
                    图表区域
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { Upload, Plus, Refresh } from '@element-plus/icons-vue'
import PageHeader from '../components/PageHeader.vue'
</script>

<style scoped>
.page-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.data-container {
  flex: 1;
  overflow-y: auto;
}

.chart-container {
  padding: 20px 0;
}

.chart-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-placeholder {
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f7fa;
  border-radius: 4px;
  color: #909399;
}

:deep(.el-tabs--border-card) {
  box-shadow: none;
  height: 100%;
}

:deep(.el-tabs__content) {
  padding: 20px;
  height: calc(100% - 55px);
  overflow-y: auto;
}

@media screen and (max-width: 768px) {
  .el-col {
    width: 100%;
  }
  
  .chart-placeholder {
    height: 200px;
  }
}
</style> 