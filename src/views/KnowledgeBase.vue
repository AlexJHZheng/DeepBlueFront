<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
const articles = ref([
  {
    id: 1,
    title: '如何使用 AI 助手',
    category: '使用指南',
    createTime: '2024-03-20'
  },
  {
    id: 2,
    title: '知识库使用说明',
    category: '使用指南',
    createTime: '2024-03-19'
  },
  {
    id: 3,
    title: '工作流配置教程',
    category: '教程',
    createTime: '2024-03-18'
  }
])

const handleSearch = () => {
  // 实现搜索逻辑
  console.log('搜索:', searchQuery.value)
}

const handleView = (article) => {
  // 实现查看文章逻辑
  console.log('查看文章:', article)
}
</script>

<template>
  <div class="knowledge-container">
    <div class="search-bar">
      <el-input
        v-model="searchQuery"
        placeholder="搜索知识库..."
        class="search-input"
      >
        <template #append>
          <el-button @click="handleSearch">
            搜索
          </el-button>
        </template>
      </el-input>
    </div>
    
    <el-table :data="articles" style="width: 100%">
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="category" label="分类" width="180" />
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="{ row }">
          <el-button
            link
            type="primary"
            @click="handleView(row)"
          >
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
.knowledge-container {
  background: white;
  padding: 20px;
  border-radius: 4px;
}

.search-bar {
  margin-bottom: 20px;
}

.search-input {
  width: 400px;
}
</style> 