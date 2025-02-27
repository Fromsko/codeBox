<template>
  <div class="chat-header">
    <div class="user-info">
      <n-dropdown :options="modelOptions" @select="handleModelSelect">
        <span class="user-name">{{
          chatStore.selectedModel || '选择模型'
        }}</span>
      </n-dropdown>
    </div>
    <div class="header-actions">
      <n-button @click="clearChat">清空</n-button>
      <n-button @click="showPromptModal">预设</n-button>
    </div>
    <n-modal
      v-model:show="promptModalVisible"
      title="设置 Prompt 预设"
      @positive="savePrompt"
      @close="closePromptModal"
    >
      <n-input
        v-model:value="promptPreset"
        type="textarea"
        placeholder="输入 Prompt 预设"
      />
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { useChatStore } from '@/utils/stores/chat'
import { NButton, NDropdown, NInput, NModal } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const chatStore = useChatStore()
const { modelOptions } = storeToRefs(chatStore)
const promptModalVisible = ref(false)
const promptPreset = ref(chatStore.getPromptPreset())

const handleModelSelect = (modelName: string) => {
  chatStore.setSelectedModel(modelName)
}

const clearChat = () => {
  chatStore.clearChatHistory()
}

const showPromptModal = () => {
  promptModalVisible.value = true
}

const savePrompt = () => {
  chatStore.setPromptPreset(promptPreset.value)
  promptModalVisible.value = false
}

const closePromptModal = () => {
  promptModalVisible.value = false
}
</script>

<style lang="scss" scoped>
.chat-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #e0e0e0;
  background-color: #f9f9f9;

  .user-info {
    display: flex;
    user-select: none;
    margin-right: 10px;
    align-items: center;

    .user-name {
      font-size: 18px;
      font-weight: 500;
      cursor: pointer;
    }
  }

  .header-actions {
    display: flex;
    gap: 10px;
  }
}
</style>
