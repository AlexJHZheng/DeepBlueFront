<script setup>
import { ref } from 'vue'

const activeTab = ref('message')
const contacts = ref([
  {
    id: 1,
    name: '技术部',
    members: ['张三', '李四', '王五']
  },
  {
    id: 2,
    name: '产品部',
    members: ['赵六', '钱七']
  }
])

const messages = ref([
  {
    id: 1,
    sender: '张三',
    content: '今天的会议记录已经整理完毕',
    time: '10:30'
  },
  {
    id: 2,
    sender: '李四',
    content: '收到，我来review一下',
    time: '10:35'
  }
])

const newMessage = ref('')

const sendMessage = () => {
  if (!newMessage.value.trim()) return
  
  messages.value.push({
    id: messages.value.length + 1,
    sender: '我',
    content: newMessage.value,
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  })
  
  newMessage.value = ''
}
</script>

<template>
  <div class="wechat-container">
    <el-tabs v-model="activeTab" class="wechat-tabs">
      <el-tab-pane label="消息" name="message">
        <div class="message-list">
          <div
            v-for="message in messages"
            :key="message.id"
            class="message-item"
          >
            <div class="message-header">
              <span class="sender">{{ message.sender }}</span>
              <span class="time">{{ message.time }}</span>
            </div>
            <div class="message-content">
              {{ message.content }}
            </div>
          </div>
        </div>
        
        <div class="message-input">
          <el-input
            v-model="newMessage"
            type="textarea"
            :rows="3"
            placeholder="输入消息..."
            @keyup.enter="sendMessage"
          />
          <el-button
            type="primary"
            @click="sendMessage"
          >
            发送
          </el-button>
        </div>
      </el-tab-pane>
      
      <el-tab-pane label="通讯录" name="contacts">
        <el-tree
          :data="contacts"
          :props="{
            label: 'name',
            children: 'members'
          }"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.wechat-container {
  background: white;
  padding: 20px;
  border-radius: 4px;
  height: 100%;
}

.wechat-tabs {
  height: 100%;
}

.wechat-tabs :deep(.el-tabs__content) {
  height: calc(100% - 55px);
  overflow: hidden;
}

.wechat-tabs :deep(.el-tab-pane) {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.message-item {
  margin-bottom: 20px;
}

.message-header {
  margin-bottom: 5px;
}

.sender {
  font-weight: bold;
  margin-right: 10px;
}

.time {
  color: #999;
  font-size: 12px;
}

.message-content {
  background: #f4f4f5;
  padding: 10px;
  border-radius: 4px;
}

.message-input {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.message-input .el-button {
  align-self: flex-end;
}
</style> 