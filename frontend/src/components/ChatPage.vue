<template>
  <div class="chat-page">
    <ChatHeader />
    <ChatMessageList />
    <ChatInput @sendMessage="handleSendMessage" />
  </div>
</template>

<script setup lang="ts">
import { Message, useChatStore } from '@/utils/stores/chat'
import { onMounted } from 'vue'
import ChatHeader from './ChatHeader.vue'
import ChatInput from './ChatInput.vue'
import ChatMessageList from './ChatMessageList.vue'

const chatStore = useChatStore()
let messageId = 0

const handleSendMessage = async (content: string) => {
  const message: Message = {
    role: 'user',
    content,
    id: messageId++,
  }
  await chatStore.sendMessage(message)
}

onMounted(() => {
  chatStore.fetchModels()
})
</script>

<style lang="scss" scoped>
.chat-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
