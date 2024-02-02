<template>
  <section>
    <h3 class="prompt-text">Previous Transactions</h3>
  </section>
  <section class="text-history">
    <div class="history" v-for="(hist, index) of reversedHistory" :key="index">
      <div class="history-number">{{ hist }}</div>
      <div class="history-action"><a class="action-details" @click="handleCheckParking(hist)">CheckAgain</a></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useHistory, usePath } from '@/stores/store'
import { handleCheckParking } from '@/scripts/checkParking'


const history = useHistory.history;
const uniqueHistory = getUniqueOnly(history);
const reversedHistory = uniqueHistory.reverse().slice(0, 5);

usePath.changeName('history');

function getUniqueOnly(arr: any) {
  let outputArray = arr.filter(function (v: any, i: any, self: any) {
    return i == self.indexOf(v);
  });
  return outputArray;
}
</script>

<style scoped>
.prompt-text {
  text-align: center;
}

.text-history {
  text-align: center;
  min-width: 40vw;
}

.history {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px dashed var(--border-hover);
  padding: 10px 0;
  margin-top: 5px;
  min-width: 60%;
}

.action-details {
  background-color: var(--color-jet-mute);
  color: var(--color-white-mute);
  font-size: smaller;
  border-radius: 10px;
  padding: 2px 6px;
}

.action-details:hover {
  background-color: var(--color-jet-norm);
  color: var(--color-white-norm);
}
</style>
