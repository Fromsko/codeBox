<template>
  <div class="chat-message-list" ref="messageList">
    <div
      v-for="(message, _) in messages"
      :key="message.id"
      :class="['message', message.role]"
      @click="handleClick(message.content)"
      @contextmenu.prevent="
        showContextMenu($event, message.id, message.content)
      "
    >
      <div
        class="message-content"
        v-html="parseMarkdown(message.content)"
      ></div>
    </div>
    <ContextMenu
      v-if="contextMenuVisible"
      :x="contextMenuX"
      :y="contextMenuY"
      :content="contextMenuContent"
      :id="contextMenuId"
      @copy="copyMessage"
      @saveScreenshot="saveScreenshot"
      @remove="removeMessage"
    />
  </div>
</template>

<script setup lang="ts">
import { useChatStore } from '@/utils/stores/chat'
import DOMPurify from 'dompurify'
import html2canvas from 'html2canvas'
import { marked } from 'marked'
import { useMessage } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { onMounted, ref, useTemplateRef } from 'vue'
import ContextMenu from './ContextMenu.vue'

const chatStore = useChatStore()
const { messages } = storeToRefs(chatStore)
const message = useMessage()

const contextMenuVisible = ref(false)
const contextMenuX = ref(0)
const contextMenuY = ref(0)
const contextMenuContent = ref('')
const contextMenuId = ref(0)
const messageList = useTemplateRef<HTMLElement | null>('messageList')

const showContextMenu = (event: MouseEvent, id: number, content: string) => {
  contextMenuX.value = event.clientX
  contextMenuY.value = event.clientY
  contextMenuContent.value = content
  contextMenuId.value = id
  contextMenuVisible.value = true
}

const copyMessage = () => {
  chatStore.copyMessage(contextMenuContent.value)
  message.success('消息已复制')
  contextMenuVisible.value = false
}

const saveScreenshot = async () => {
  contextMenuVisible.value = false
  await new Promise((resolve) => setTimeout(resolve, 100))

  try {
    const element = document.documentElement
    const canvas = await html2canvas(element, { useCORS: true })
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dataURL = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = dataURL
    link.download = 'chat-screenshot.png'
    link.click()
    message.success('聊天截屏已保存')
  } catch (error) {
    console.error('截图失败:', error)
    message.error('截图失败，请重试')
  }
}

const removeMessage = () => {
  chatStore.removeMessage(contextMenuId.value)
  message.success('消息已删除')
  contextMenuVisible.value = false
}

const handleClick = (content: string) => {
  chatStore.copyMessage(content)
  message.success('消息已复制')
}

const parseMarkdown = (text: string) => {
  return DOMPurify.sanitize(marked(text) as string)
}

onMounted(() => {
  document.addEventListener('click', (event) => {
    if (
      messageList.value &&
      !messageList.value.contains(event.target as Node)
    ) {
      contextMenuVisible.value = false
    }
  })
})
</script>

<style lang="scss" scoped>
.chat-message-list {
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  position: relative;
}

.message {
  padding: 12px 16px;
  margin-bottom: 10px;
  border-radius: 12px;
  max-width: 70%;
  align-self: flex-start;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  word-wrap: break-word;
  user-select: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f0f0f0;

  &.user {
    background-color: #dcf8c6;
    align-self: flex-end;
  }

  &.system {
    background-color: #e5e5ea;
    align-self: flex-start;
  }

  .message-content {
    word-wrap: break-word;
  }
}
</style>
