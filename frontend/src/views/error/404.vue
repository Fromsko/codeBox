<template>
  <n-result status="404" title="404 资源不存在" description="生活总归带点荒谬">
    <template #footer>
      <n-button @click="router.back">回到主页</n-button>
    </template>
  </n-result>
</template>

<script lang="ts" setup>
import router from '@/router'
import { defineComponent } from 'vue'

defineComponent({
  name: 'ComponentName',
})
</script>

<style scoped>
h1 {
  user-select: none;
}
</style>
