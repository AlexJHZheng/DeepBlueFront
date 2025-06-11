<template>
  <div class="page-container">
    <PageHeader title="历史记录">
      <template #actions>
        <el-button-group>
          <el-button type="primary" plain>
            <el-icon><Download /></el-icon>
            导出记录
          </el-button>
          <el-button type="danger" plain>
            <el-icon><Delete /></el-icon>
            清空记录
          </el-button>
        </el-button-group>
      </template>
    </PageHeader>

    <div class="history-container">
      <el-card>
        <template #header>
          <div class="filter-header">
            <el-form :inline="true" class="filter-form">
              <el-form-item label="时间范围">
                <el-date-picker
                  v-model="dateRange"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />
              </el-form-item>
              <el-form-item label="类型">
                <el-select v-model="type" placeholder="请选择">
                  <el-option label="全部" value="" />
                  <el-option label="对话" value="chat" />
                  <el-option label="分析" value="analysis" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary">查询</el-button>
                <el-button>重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </template>

        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="时间" width="180" />
          <el-table-column prop="type" label="类型" width="120">
            <template #default="{ row }">
              <el-tag :type="row.type === 'chat' ? 'primary' : 'success'">
                {{ row.type === 'chat' ? '对话' : '分析' }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="content" label="内容" show-overflow-tooltip />
          <el-table-column label="操作" width="150" fixed="right">
            <template #default>
              <el-button type="primary" link>查看</el-button>
              <el-button type="danger" link>删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination-container">
          <el-pagination
            background
            layout="total, prev, pager, next"
            :total="100"
            :page-size="10"
          />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Download, Delete } from '@element-plus/icons-vue'
import PageHeader from '../components/PageHeader.vue'

const dateRange = ref([])
const type = ref('')

// 模拟数据
const tableData = ref([
  {
    date: '2024-03-19 10:00:00',
    type: 'chat',
    content: '关于数据分析流程的对话'
  },
  {
    date: '2024-03-19 11:30:00',
    type: 'analysis',
    content: '销售数据趋势分析报告'
  },
  {
    date: '2024-03-19 14:20:00',
    type: 'chat',
    content: '工作流程优化建议讨论'
  }
])
</script>

<style scoped>
.page-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.history-container {
  flex: 1;
  overflow-y: auto;
}

.filter-header {
  padding: 8px 0;
}

.filter-form {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

@media screen and (max-width: 768px) {
  .filter-form {
    flex-direction: column;
  }

  .filter-form :deep(.el-form-item) {
    margin-right: 0;
    margin-bottom: 16px;
  }

  .filter-form :deep(.el-form-item__content) {
    width: 100%;
  }

  .filter-form :deep(.el-date-editor),
  .filter-form :deep(.el-select) {
    width: 100%;
  }
}
</style> 