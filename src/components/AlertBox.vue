<template>
  <div id="alert-box" class="alert-box">
    <span class="alert-content" :class="[type]" @click="useAlert.toggleVisibility(false)">
      <h1>{{ title }}</h1>
      <p>{{ message }}</p>
    </span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useAlert } from '@/stores/store'

const props = defineProps<{
  title: string
  message: string
  type: string
}>()
const _dummyProps = props // Dummy reference to satisfy ESLint
if (_dummyProps) {
  // console.log('')
}
</script>

<style scoped>
.alert-box {
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 4;
  background-color: rgba(255, 255, 255, 0.9);
  font-size: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.alert-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 90px;
  border-radius: 25px 8px 25px 8px;
  transform: rotate(-10deg);
}

.alert-content h1 {
  font-size: 1.2rem;
}

.alert-content p {
  font-size: 1rem;
}

.alert-danger {
  background-color: maroon;
  color: white;
}

.alert-success {
  background-color: green;
  color: white;
}

.alert-info {
  background-color: blue;
  color: white
}

.alert-warning {
  color: orange;
}
</style>
