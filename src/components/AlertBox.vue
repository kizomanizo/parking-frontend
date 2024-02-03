<template>
  <span id="alert-box" class="alert-box" :class="[type]" @click="useAlert.toggleVisibility(false)">
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
  </span>
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

.alert-box h1 {
  font-size: 1.7rem;
}

.alert-box p {
  font-size: 1.3rem;
}

.alert-danger {
  color: red;
}

.alert-success {
  color: green;
}

.alert-info {
  color: blue;
}

.alert-warning {
  color: orange;
}
</style>
