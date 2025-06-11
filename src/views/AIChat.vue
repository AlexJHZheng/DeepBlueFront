<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { Position, User, Setting, Document, Collection, Guide, ArrowRight } from '@element-plus/icons-vue'
import PageHeader from '../components/PageHeader.vue'
import { ElMessage } from 'element-plus'

const messagesRef = ref(null)
const inputMessage = ref('')
const isTyping = ref(false)
const showSettings = ref(false)
const settings = ref({
  prompt: '你是一个专业的AI助手，擅长...',
  temperature: 0.7
})

const messages = ref([
  {
    type: 'ai',
    content: '您好！我是您的AI助手。您可以通过对话查询，也可以使用工作台进行复杂的数据分析流程。'
  }
])

const getCurrentTime = () => {
  const now = new Date()
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
}

const scrollToBottom = async () => {
  await nextTick()
  if (messagesRef.value) {
    messagesRef.value.scrollTop = messagesRef.value.scrollHeight
  }
}

const sendMessage = async () => {
  if (!inputMessage.value.trim()) return

  // 添加用户消息
  messages.value.push({
    type: 'user',
    content: inputMessage.value
  })

  await scrollToBottom()
  
  // 显示输入中动画
  isTyping.value = true
  await scrollToBottom()

  // 模拟AI响应
  setTimeout(() => {
    isTyping.value = false
    messages.value.push({
      type: 'ai',
      content: '我已经分析了您的查询："' + inputMessage.value + '"。如果您需要执行复杂的多步骤分析，建议使用工作台功能。'
    })
    scrollToBottom()
  }, 1500)

  inputMessage.value = ''
}

const saveSettings = () => {
  // 这里添加保存设置的逻辑
  localStorage.setItem('ai-settings', JSON.stringify(settings.value))
  showSettings.value = false
  ElMessage.success('设置已保存')
}

onMounted(() => {
  // 加载保存的设置
  const savedSettings = localStorage.getItem('ai-settings')
  if (savedSettings) {
    settings.value = JSON.parse(savedSettings)
  }
  scrollToBottom()
})
</script>

<template>
  <div class="page-container">
    <PageHeader 
      title="智能对话" 
      :showBreadcrumb="false"
    >
      <template #actions>
        <el-button type="primary" plain class="hover-btn" @click="showSettings = true">
          <el-icon><Setting /></el-icon>
          AI设置
        </el-button>
      </template>
    </PageHeader>
    
    <!-- 设置抽屉 -->
    <el-drawer
      v-model="showSettings"
      title="AI助手设置"
      size="400px"
      :with-header="false"
      class="settings-drawer"
    >
      <div class="drawer-header">
        <h2 class="text-gradient">AI助手设置</h2>
        <p class="subtitle">配置AI助手的行为和个性</p>
      </div>

      <div class="drawer-content">
        <div class="setting-section">
          <h3>前置提示词配置</h3>
          <el-input
            v-model="settings.prompt"
            type="textarea"
            :rows="6"
            placeholder="设置AI助手的角色定位和行为准则..."
            class="custom-input mb-4"
          />
        </div>

        <div class="setting-section">
          <h3>温度设置</h3>
          <div class="temperature-slider">
            <el-slider
              v-model="settings.temperature"
              :min="0"
              :max="2"
              :step="0.1"
              show-input
            />
            <p class="setting-desc">较低的值会使回答更加确定和一致，较高的值会使回答更有创造性</p>
          </div>
        </div>

        <div class="setting-section">
          <h3>参考文档</h3>
          <div class="doc-links">
            <a href="#" class="doc-link glass-effect" target="_blank">
              <el-icon><Document /></el-icon>
              <span>
                <strong>快速入门指南</strong>
                <small>了解如何有效使用AI助手</small>
              </span>
              <el-icon><ArrowRight /></el-icon>
            </a>
            <a href="#" class="doc-link glass-effect" target="_blank">
              <el-icon><Collection /></el-icon>
              <span>
                <strong>提示词工程指南</strong>
                <small>学习编写高效的提示词</small>
              </span>
              <el-icon><ArrowRight /></el-icon>
            </a>
            <a href="#" class="doc-link glass-effect" target="_blank">
              <el-icon><Guide /></el-icon>
              <span>
                <strong>最佳实践</strong>
                <small>探索AI对话的高级技巧</small>
              </span>
              <el-icon><ArrowRight /></el-icon>
            </a>
          </div>
        </div>
      </div>

      <div class="drawer-footer">
        <el-button plain @click="showSettings = false">取消</el-button>
        <el-button type="primary" class="gradient-button" @click="saveSettings">
          保存设置
        </el-button>
      </div>
    </el-drawer>

    <div class="chat-container glass-effect">
      <!-- 聊天记录区域 -->
      <div class="chat-messages" ref="messagesRef">
        <div v-for="(message, index) in messages" 
          :key="index" 
          class="message-item" 
          :class="[message.type, {'animate-slide-in': true}]"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="message-avatar">
            <el-avatar :size="40" class="avatar-animation">
              <el-icon v-if="message.type === 'user'" class="text-gradient"><User /></el-icon>
              <span v-else class="ai-avatar">AI</span>
            </el-avatar>
          </div>
          <div class="message-content">
            <div class="message-bubble">
              <div class="message-text" v-html="message.content"></div>
              <div class="message-time">{{ getCurrentTime() }}</div>
            </div>
          </div>
        </div>
        <div v-if="isTyping" class="message-item ai animate-slide-in">
          <div class="message-avatar">
            <el-avatar :size="40" class="avatar-animation">
              <span class="ai-avatar">AI</span>
            </el-avatar>
          </div>
          <div class="message-content">
            <div class="message-bubble typing">
              <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 输入区域 -->
      <div class="chat-input glass-effect">
        <div class="input-container">
          <el-input
            v-model="inputMessage"
            type="textarea"
            :rows="3"
            placeholder="试试输入：查看在途信息并进行对比分析"
            resize="none"
            @keyup.enter.ctrl="sendMessage"
            class="custom-input"
          />
          <el-button type="primary" class="send-button gradient-button" @click="sendMessage">
            <el-icon><Position /></el-icon>
          </el-button>
        </div>
        <div class="input-tips">
          按下 Ctrl + Enter 发送
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.chat-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: var(--border-radius-lg);
  margin: 0 20px 20px;
  overflow: hidden;
  position: relative;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.message-item {
  display: flex;
  margin-bottom: 20px;
  align-items: flex-start;
  opacity: 0;
}

.animate-slide-in {
  animation: slideIn 0.5s ease forwards;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message-avatar {
  margin-right: 12px;
}

.avatar-animation {
  transition: transform 0.3s ease;
}

.avatar-animation:hover {
  transform: scale(1.1);
}

.ai-avatar {
  font-size: 14px;
  font-weight: bold;
  background: var(--primary-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.message-content {
  flex: 1;
  max-width: 80%;
}

.message-bubble {
  display: inline-block;
  padding: 12px 16px;
  border-radius: 12px;
  position: relative;
  transition: transform 0.3s ease;
}

.message-bubble:hover {
  transform: translateY(-2px);
}

.message-text {
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
}

.message-time {
  font-size: 12px;
  color: #94a3b8;
  margin-top: 4px;
  text-align: right;
}

.ai .message-bubble {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.user .message-bubble {
  background: var(--primary-gradient);
  color: white;
  margin-left: auto;
}

.typing {
  padding: 16px;
  width: 80px;
}

.typing-indicator {
  display: flex;
  justify-content: center;
  gap: 4px;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  background: var(--el-color-primary);
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out;
}

.typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
.typing-indicator span:nth-child(2) { animation-delay: -0.16s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

.chat-input {
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.7);
}

.input-container {
  display: flex;
  gap: 12px;
}

.custom-input {
  --el-input-bg-color: rgba(255, 255, 255, 0.8);
  --el-input-border-color: rgba(255, 255, 255, 0.2);
  --el-input-hover-border-color: rgba(255, 255, 255, 0.3);
  --el-input-focus-border-color: var(--el-color-primary);
}

.custom-input :deep(.el-textarea__inner) {
  resize: none;
  border-radius: var(--border-radius);
  box-shadow: none;
  backdrop-filter: blur(4px);
}

.send-button {
  height: auto;
  border-radius: var(--border-radius);
  transition: all 0.3s ease;
}

.send-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.input-tips {
  margin-top: 8px;
  text-align: right;
  color: #94a3b8;
  font-size: 12px;
}

.settings-drawer {
  --el-drawer-bg-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}

.drawer-header {
  padding: 24px;
  background: var(--surface-gradient);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.drawer-header h2 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.drawer-header .subtitle {
  margin: 8px 0 0;
  color: #64748b;
  font-size: 14px;
}

.drawer-content {
  padding: 24px;
}

.setting-section {
  margin-bottom: 24px;
}

.setting-section h3 {
  margin: 0 0 16px;
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
}

.setting-desc {
  margin: 8px 0 0;
  font-size: 12px;
  color: #64748b;
}

.doc-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.doc-link {
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: var(--border-radius);
  color: #1e293b;
  text-decoration: none;
  transition: all 0.3s ease;
}

.doc-link:hover {
  transform: translateX(4px);
}

.doc-link .el-icon {
  font-size: 20px;
  color: var(--el-color-primary);
}

.doc-link span {
  flex: 1;
  margin: 0 12px;
  display: flex;
  flex-direction: column;
}

.doc-link strong {
  font-size: 14px;
  font-weight: 600;
}

.doc-link small {
  font-size: 12px;
  color: #64748b;
  margin-top: 2px;
}

.drawer-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 24px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

@media screen and (max-width: 768px) {
  .chat-container {
    margin: 0;
    border-radius: 0;
  }

  .message-content {
    max-width: 90%;
  }

  .chat-input {
    padding: 12px;
  }

  .input-container {
    flex-direction: column;
  }

  .send-button {
    height: 44px;
  }

  .settings-drawer {
    width: 100% !important;
  }
}
</style> 