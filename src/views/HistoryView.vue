<template>
  <section>
    <h3 class="prompt-text">{{ t('history.heading') }}</h3>
  </section>
  <section class="text-history" v-if="!isHistoryFull">
    <div class="history" v-for="(hist, index) of reversedHistory" :key="index">
      <div class="history-number">{{ hist }}</div>
      <div class="history-action">
        <a class="action-details" @click="handleCheckParking(hist)">{{ t('history.checkAgain') }}</a>
      </div>
    </div>
  </section>
  <section class="text-history" v-else>
    <div class="history" v-for="(hist, index) of reversedFullHistory" :key="index">
      <div class="history-number">{{ hist }}</div>
      <div class="history-action">
        <a class="action-details" @click="handleCheckParking(hist)">{{ t('history.checkAgain') }}</a>
      </div>
    </div>
  </section>
  <section class="more-actions" v-if="useHistory.history.length > 0">
    <a class="clear-history" @click="usePrompt.changeVisibility(true)">{{ t('history.clearHistory') }}</a>
    <a class="show-more" v-if="history.length > 5 && useHistory.isFull == false" @click="useHistory.changeSize(true)">{{
      t('history.showMore') }}</a>
    <a class="show-more" v-else-if="useHistory.isFull == true" @click="useHistory.changeSize(false)">{{
      t('history.showLess') }}</a>
  </section>
  <section class="more-actions" v-else>
    <p>{{ t('history.noHistory') }}</p>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useHistory, usePath, usePrompt } from '@/stores/store'
import { handleCheckParking } from '@/scripts/checkParking'
import { useI18n } from 'vue-i18n';

const history = useHistory.history
const uniqueHistory = history.length > 0 ? getUniqueOnly(history) : [];
const reversedHistory = uniqueHistory.reverse().slice(0, 5)
const reversedFullHistory = uniqueHistory.reverse()

const isHistoryFull = computed(() => useHistory.isFull);

const { t } = useI18n();

usePath.changeName('history')

function getUniqueOnly(arr: any) {
  let outputArray = arr.filter(function (v: any, i: any, self: any) {
    return i == self.indexOf(v)
  })
  return outputArray
}
</script>

<style scoped>
.prompt-text {
  text-align: center;
}

.text-history {
  text-align: center;
  min-width: 40vw;
  overflow-y: scroll;
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

.more-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: 30px;
  font-size: small;
}

.clear-history:hover {
  color: red;
}
</style>
