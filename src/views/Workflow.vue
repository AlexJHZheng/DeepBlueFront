<script setup>
import { ref } from 'vue'
import PageHeader from '../components/PageHeader.vue'
import { 
  Plus, More, Edit, CopyDocument, Share, Delete,
  Timer, View, VideoPlay,
  Monitor, Connection, DataLine, ChatLineRound
} from '@element-plus/icons-vue'

const workflows = ref([
  {
    id: 1,
    name: '数据分析流程',
    type: 'analysis',
    icon: 'DataLine',
    description: '自动化数据清洗、分析和可视化的完整工作流程',
    lastRun: '2小时前',
    runs: 128,
    tags: ['数据分析', '自动化', 'Python']
  },
  {
    id: 2,
    name: 'AI对话助手',
    type: 'chat',
    icon: 'ChatLineRound',
    description: '基于GPT的智能对话系统，支持多轮对话和上下文理解',
    lastRun: '30分钟前',
    runs: 256,
    tags: ['AI', 'GPT', '对话']
  },
  {
    id: 3,
    name: '系统监控',
    type: 'monitor',
    icon: 'Monitor',
    description: '实时监控系统性能指标，自动报警和故障诊断',
    lastRun: '5分钟前',
    runs: 1024,
    tags: ['监控', '报警', '运维']
  },
  {
    id: 4,
    name: 'API集成',
    type: 'integration',
    icon: 'Connection',
    description: '多系统API数据集成和转换工作流',
    lastRun: '1天前',
    runs: 64,
    tags: ['API', '集成', '自动化']
  }
])

const dialogVisible = ref(false)
const currentWorkflow = ref({
  name: '',
  description: ''
})

const handleCreate = () => {
  dialogVisible.value = true
}

const handleSubmit = () => {
  // 实现创建工作流逻辑
  console.log('创建工作流:', currentWorkflow.value)
  dialogVisible.value = false
}

const handleView = (workflow) => {
  // 实现查看工作流逻辑
  console.log('查看工作流:', workflow)
}

const getTagType = (tag) => {
  const types = {
    'AI': 'primary',
    'GPT': 'success',
    '监控': 'warning',
    '报警': 'danger',
    '数据分析': 'info'
  }
  return types[tag] || ''
}
</script>

<template>
  <div class="page-container">
    <PageHeader 
      title="工作台" 
      subtitle="在这里创建和管理您的AI工作流"
    >
      <template #actions>
        <el-button type="primary" class="gradient-button">
          <el-icon><Plus /></el-icon>
          新建工作流
        </el-button>
      </template>
    </PageHeader>

    <div class="workflow-container">
      <!-- 工作流卡片网格 -->
      <div class="workflow-grid">
        <div v-for="(workflow, index) in workflows" 
          :key="workflow.id" 
          class="workflow-card glass-effect hover-card"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="card-header">
            <div class="card-icon" :class="workflow.type">
              <el-icon><component :is="workflow.icon" /></el-icon>
            </div>
            <div class="card-title">
              <h3>{{ workflow.name }}</h3>
              <span class="card-type">{{ workflow.type }}</span>
            </div>
            <el-dropdown trigger="click">
              <el-button type="text">
                <el-icon><More /></el-icon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <el-icon><Edit /></el-icon>
                    编辑
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-icon><CopyDocument /></el-icon>
                    复制
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-icon><Share /></el-icon>
                    分享
                  </el-dropdown-item>
                  <el-dropdown-item divided type="danger">
                    <el-icon><Delete /></el-icon>
                    删除
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>

          <div class="card-content">
            <p class="description">{{ workflow.description }}</p>
            <div class="stats">
              <div class="stat-item">
                <el-icon><Timer /></el-icon>
                <span>{{ workflow.lastRun }}</span>
              </div>
              <div class="stat-item">
                <el-icon><View /></el-icon>
                <span>{{ workflow.runs }}次运行</span>
              </div>
            </div>
          </div>

          <div class="card-footer">
            <div class="tags">
              <el-tag 
                v-for="tag in workflow.tags" 
                :key="tag"
                :type="getTagType(tag)"
                effect="light"
                class="animate-tag"
              >
                {{ tag }}
              </el-tag>
            </div>
            <el-button type="primary" class="run-button gradient-button">
              <el-icon><VideoPlay /></el-icon>
              运行
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  height: 100%;
  padding: 0 20px 20px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.workflow-container {
  height: calc(100% - 60px);
  overflow-y: auto;
}

.workflow-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px 0;
}

.workflow-card {
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-header {
  display: flex;
  align-items: center;
  padding: 20px;
  gap: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.card-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;
  transition: transform 0.3s ease;
}

.card-icon:hover {
  transform: scale(1.1);
}

.analysis {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

.chat {
  background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);
}

.monitor {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.integration {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.card-title {
  flex: 1;
}

.card-title h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
}

.card-type {
  font-size: 12px;
  color: #64748b;
  text-transform: capitalize;
}

.card-content {
  padding: 20px;
}

.description {
  margin: 0;
  font-size: 14px;
  color: #475569;
  line-height: 1.5;
}

.stats {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #64748b;
}

.card-footer {
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.animate-tag {
  animation: tagPulse 2s infinite;
}

@keyframes tagPulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.run-button {
  min-width: 80px;
}

.run-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

@media screen and (max-width: 768px) {
  .page-container {
    padding: 0 12px 12px;
  }

  .workflow-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .card-header {
    padding: 16px;
  }

  .card-content {
    padding: 16px;
  }

  .card-footer {
    padding: 16px;
    flex-direction: column;
    gap: 12px;
  }

  .run-button {
    width: 100%;
  }
}
</style> 