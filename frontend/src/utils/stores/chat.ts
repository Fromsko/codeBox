import request from '@/utils/request'
import { defineStore } from 'pinia'

export interface Message {
  role: 'user' | 'system'
  content: string
  id: number
}

interface ChatState {
  messages: Message[]
  loading: boolean
  selectedModel: string
  modelOptions: { label: string; value: string; key: string }[]
}

interface OllamaResponse {
  response: string
}

export const useChatStore = defineStore('chat', {
  state: (): ChatState => ({
    messages: JSON.parse(localStorage.getItem('chatMessages') || '[]'),
    loading: false,
    selectedModel: localStorage.getItem('selectedModel') || '',
    modelOptions: [],
  }),
  actions: {
    async sendMessage(message: Message) {
      this.loading = true
      this.messages.push(message)
      try {
        const response: OllamaResponse = await request.post('/api/generate', {
          model: this.selectedModel,
          prompt: message.content,
          stream: false,
        })
        const ollamaResponse: Message = {
          role: 'system',
          content: response.response,
          id: message.id + 1,
        }
        this.messages.push(ollamaResponse)
        this.loading = false
        this.saveChatHistory()
      } catch (error) {
        this.loading = false
        console.error('发送消息失败:', error)
      }
    },
    removeMessage(id: number) {
      this.messages = this.messages.filter((msg) => msg.id !== id)
      this.saveChatHistory()
    },
    copyMessage(content: string) {
      navigator.clipboard.writeText(content)
    },
    setSelectedModel(modelName: string) {
      this.selectedModel = modelName
      localStorage.setItem('selectedModel', modelName)
    },
    async fetchModels() {
      try {
        const response: any = await request.get('/api/tags') // 使用 axios
        this.modelOptions = response.models.map((model: { name: any }) => ({
          label: model.name,
          value: model.name,
          key: model.name,
        }))
        console.log('Model options:', this.modelOptions)
      } catch (error) {
        console.error('获取模型列表失败:', error)
      }
    },
    saveChatHistory() {
      localStorage.setItem('chatMessages', JSON.stringify(this.messages))
    },
    clearChatHistory() {
      this.messages = []
      localStorage.removeItem('chatMessages')
    },
    setPromptPreset(prompt: string) {
      localStorage.setItem('promptPreset', prompt)
    },
    getPromptPreset() {
      return localStorage.getItem('promptPreset') || ''
    },
  },
})
