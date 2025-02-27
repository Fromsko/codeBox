<template>
  <div class="container">
    <div class="close-btn" @click="handleClose">x</div>
    <div class="minimize-btn" @click="handleMinimize">-</div>
  </div>
</template>

<script setup lang="ts">
import { Quit, WindowMinimise } from '../../wailsjs/runtime'

const handleClose = () => {
  Quit()
}

const handleMinimize = () => {
  WindowMinimise()
}
</script>

<style lang="scss" scoped>
.container{
  user-select: none;
}

.close-btn,
.minimize-btn {
  position: absolute;
  top: 5px;
  right: 15px;
  padding: 5px 10px;
  background-color: transparent;
  cursor: pointer;
  font-size: 20px;
  color: black;
  transition: background-color 0.3s;
  z-index: 10;
}

.close-btn:hover,
.minimize-btn:hover {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.minimize-btn {
  right: 50px;
}
</style>
