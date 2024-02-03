<template>
  <div class="prompt-cover">
    <div class="prompt">
      <p class="prompt-text">Are you sure you want to clear search history?</p>
      <div class="prompt-response">
        <div class="response-yes" @click="useHistory.clearHistory()">YES</div>
        <div class="response-no" @click="usePrompt.changeVisibility(false)">NO</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHistory, usePrompt } from '@/stores/store'
</script>

<style>
.prompt-cover {
  height: 103vh;
  width: 103vw;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 4;
}

.prompt {
  background-color: var(--color-jet-norm);
  height: fit-content;
  width: 350px;
  color: var(--color-white-mute);
  z-index: 5;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: -30px;
  border-radius: 10px;
  box-shadow: 1px 2px 6px var(--color-jet-mute);
}

.prompt-text {
  padding: 10px 5px;
}

.prompt-response {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-top: 1px dashed var(--color-jet-mute);
}

.response-yes,
.response-no {
  width: 50%;
  padding: 10px;
  cursor: pointer;
  font-size: smaller;
  font-weight: bolder;
}

.response-yes:hover,
.response-no:hover {
  background-color: var(--color-jet-mute);
  transition: 1s;
}

.response-yes:active,
.response-no:active {
  background-color: var(--color-jet-mute);
  transition: 0.5s;
}

.response-no {
  color: gold;
  border-radius: 0 0 10px 0;
}

.response-yes {
  color: lightgreen;
  border-radius: 0 0 0 10px;
}
</style>
