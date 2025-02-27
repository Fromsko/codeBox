<template>
  <div class="context-menu" :style="{ left: x + 'px', top: y + 'px' }">
    <div class="menu-item" @click="copy">复制</div>
    <div class="menu-item" @click="saveScreenshot">保存聊天截屏</div>
    <div class="menu-item" @click="remove">删除</div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'

defineProps<{ x: number; y: number; content: string; id: number }>()
const emit = defineEmits(['copy', 'saveScreenshot', 'remove'])

const copy = () => emit('copy')
const saveScreenshot = () => emit('saveScreenshot')
const remove = () => emit('remove')
</script>

<style lang="scss" scoped>
.context-menu {
  position: fixed;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px 0;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;

  .menu-item {
    padding: 8px 15px;
    cursor: pointer;

    &:hover {
      background-color: #f0f0f0;
    }
  }
}
</style>
