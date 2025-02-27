<template>
  <div class="container">
    <n-card class="Invite-Container">
      <h2>欢迎使用</h2>
      <InviteInput @inputChange="handleInputChange" @submit="handleSubmit" />
    </n-card>
  </div>
</template>

<script setup lang="ts">
import InviteInput from '@/components/InviteInput.vue'
import { useInviteStore } from '@/utils/stores/invite'
import { useMessage } from 'naive-ui'

let router = useRouter()
const message = useMessage()
const inviteStore = useInviteStore()

const handleInputChange = (value: string) => {
  inviteStore.setInviteCode(value)
  console.log('输入框变化:', value)
}

const handleSubmit = async (value: string) => {
  if (value.trim() === '') {
    message.error('请输入有效的邀请码')
    return
  }

  if (value.trim() === 'fromsko') {
    await router.push('/chat')
    return
  }

  try {
    const response = await inviteStore.submitInviteCode()
    message.success(`已使用邀请码: ${value}`)
    console.log('API 响应:', response)
  } catch (error) {
    message.error('提交失败，请重试')
    console.error('提交失败:', error)
  }
}
</script>

<style lang="scss" scoped>
@use 'sass:color';

.container {
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: linear-gradient(200deg, #72afd3, #96fbc4);
}

.Invite-Container {
  background: variables.$container-bg;
  box-shadow: 0 4px 20px variables.$shadow-color;
  border: 1px solid variables.$border-color;
  border-radius: 20px;
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  width: 300px;

  h2 {
    margin-bottom: 16px;
    font-size: 24px;
    color: variables.$primary-color;
    text-align: center;
  }
}
</style>
