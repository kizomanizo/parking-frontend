<template>
  <section>
    <h3 class="prompt-text">Previous Transactions</h3>
  </section>
  <section class="text-history">
    <div class="history" v-for="(hist, index) of reversedHistory" :key="index">
      <div class="history-car">{{ hist }}</div>
      <div class="history-amount">unknown</div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useHistory } from '@/stores/store'

const history = useHistory.history;
const uniqueHistory = getUniqueOnly(history);
const reversedHistory = uniqueHistory.reverse().slice(0, 5);

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
  grid-template-columns: 1fr 2fr;
  border-bottom: 5px dashed var(--border-hover);
  padding: 10px 0;
  margin-top: 5px;
  min-width: 70%;
}
</style>
