<template>
  <div class="chat-input-group">
    <input
      v-model="message"
      type="text"
      @keydown.enter="sendMessage"
      placeholder="输入消息..."
      class="chat-input-field"
    />
    <button @click="sendMessage" class="chat-send-button">发送</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const message = ref('')
const emit = defineEmits(['sendMessage'])

const sendMessage = () => {
  if (message.value.trim()) {
    emit('sendMessage', message.value)
    message.value = ''
  }
}
</script>

<style lang="scss" scoped>
.chat-input-group {
  display: flex;
  padding: 10px 20px;
  border-top: 1px solid #e0e0e0;
  //   background-color: #f9f9f9;

  .chat-input-field {
    flex-grow: 1;
    padding: 10px 15px;
    border: 1px solid #ccc;
    border-radius: 20px 0 0 20px;
    margin-right: 0;
    font-size: 16px;
    outline: none;

    &:focus {
      border-color: #4caf50;
    }
  }

  .chat-send-button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 0 20px 20px 0;
    cursor: pointer;
    font-size: 16px;
    outline: none;

    &:hover {
      background-color: #45a049;
    }
  }
}
</style>
