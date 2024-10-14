<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n';

import { useAlert, useLoading, usePath, usePrompt } from './stores/store'
import FooterComponent from './components/FooterComponent.vue'
import AlertBox from './components/AlertBox.vue'
import LoadingBox from './components/LoadingBox.vue'
import PromptCover from './components/PromptCover.vue'

const selectedPath = computed(() => usePath.name)
const { t } = useI18n();
</script>

<template>
  <PromptCover v-if="usePrompt.isVisible.value == true" />
  <AlertBox :title="useAlert.title" :message="useAlert.message" :type="useAlert.type" v-if="useAlert.visible" />
  <LoadingBox v-if="useLoading.visible" />
  <div class="page-wrapper">
    <header class="page-header">
      <!-- <h1 class="header-heading">Check Parking Fees</h1> -->
      <h1 class="header-heading">{{ t('app.topHeading') }}</h1>
      <nav class="header-nav">
        <RouterLink to="/" class="top-link-left" :class="{
          'selected-left': selectedPath === 'home',
          'unselected-left': selectedPath === 'history'
        }" @click="usePath.changeName('home')">{{ t('app.checkToggle') }}</RouterLink>
        <RouterLink to="/history" class="top-link-right" :class="{
          'selected-right': selectedPath === 'history',
          'unselected-right': selectedPath === 'home'
        }">
          {{ t('app.historyToggle') }}
        </RouterLink>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
  <div class="section-gap">
  </div>
  <FooterComponent />
</template>

<style scoped>
header {
  position: relative;
  height: 20%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

header h1 {
  font-size: 1.6rem;
  color: var(--text-head-norm);
}

nav {
  display: flex;
  width: fit-content;
  max-height: fit-content;
  text-align: center;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 2px 2px 5px var(--color-jet-cool);
}

.top-link-left {
  background-color: var(--color-silver-norm);
  color: var(--color-white-norm);
  padding: 4px 7px;
  border-radius: 10px 0 0 10px;
  width: 120px;
}

.top-link-left:hover {
  background-color: var(--color-jet-norm);
}

.top-link-right {
  background-color: var(--color-silver-norm);
  color: var(--color-white-norm);
  padding: 4px 7px;
  border-radius: 0 10px 10px 0;
  width: 120px;
}

.top-link-right:hover {
  background-color: var(--color-jet-norm);
}

.unselected-left {
  box-shadow: 1px 1px 5px var(--color-jet-norm);
  z-index: 3;
}

.unselected-right {
  box-shadow: -1px 1px 5px var(--color-jet-norm);
  z-index: 3;
}

.selected-left {
  background-color: var(--color-jet-norm);
  color: var(--color-white-cool);
}

.selected-right {
  background-color: var(--color-jet-norm);
  color: var(--color-white-cool);
}

main {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 0 10px;
  margin-top: 20px;
}

.section-gap {
  padding-bottom: 50px;
}

@media (max-width: 1024px) {
  body {
    font-size: 1rem;
    max-width: 100%;
    overflow-x: hidden;
    flex-direction: column;
  }

  .page-wrapper {
    min-height: 100vh;
    min-width: 100%;
  }

  header {
    height: fit-content;
  }

  header h1 {
    font-size: 2rem;
  }

  main {
    align-items: center;
    justify-content: flex-start;
  }
}
</style>
