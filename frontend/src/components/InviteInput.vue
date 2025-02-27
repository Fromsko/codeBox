<template>
  <n-input-group style="margin-bottom: 16px">
    <n-input
      v-model:value="inputValue"
      placeholder="输入邀请码"
      type="text"
      clearable
      @input="handleInput"
      @keydown.enter.prevent="handleSubmit"
    />
    <n-button type="primary" strong @click="handleSubmit">加入</n-button>
  </n-input-group>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NInput, NButton, NInputGroup } from 'naive-ui'

const inputValue = ref('')

const emit = defineEmits(['inputChange', 'submit'])

const handleInput = () => {
  emit('inputChange', inputValue.value)
}

const handleSubmit = () => {
  emit('submit', inputValue.value)
}
</script>

<style lang="scss" scoped>
.n-input {
  width: 100%;
  border-radius: 5px 0 0 5px;

  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px 0 0 5px;
    font-size: 14px;
  }
}

.n-button {
  padding: 10px;
  border: none;
  border-radius: 0 5px 5px 0;
  font-size: 16px;
  cursor: pointer;
}
</style>
