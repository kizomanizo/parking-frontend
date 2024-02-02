<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useAlert, useLoading, usePath } from './stores/store'
import FooterComponent from './components/FooterComponent.vue'
import AlertBox from './components/AlertBox.vue'
import LoadingBox from './components/LoadingBox.vue'

const selectedPath = computed(() => usePath.name);

usePath.changeName('home');
</script>

<template>
  <div class="page-wrapper">
    <AlertBox :title="useAlert.title" :message="useAlert.message" :type="useAlert.type" v-if="useAlert.visible" />
    <LoadingBox v-if="useLoading.visible" />
    <header class="page-header">
      <h1 class="header-heading">Check Parking Fees</h1>
      <nav class="header-nav">

        <RouterLink to="/" class="top-link-left" :class="{ 'selected-left': selectedPath === 'home' }"
          @click="usePath.changeName('home')">Check
          Fees</RouterLink>
        <RouterLink to="/history" class="top-link-right" :class="{ 'selected-right': selectedPath === 'history' }">History
        </RouterLink>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
  <FooterComponent />
</template>

<style scoped>
header {
  position: relative;
  height: 20%;
  width: 100%;
  text-align: center;
}

header h1 {
  font-size: 1.6rem;
  color: var(--text-head-norm);
}

nav {
  flex: 1;
  text-align: center;
  align-items: center;
  justify-content: center;
}

/* .top-link-left {
  background-color: var(--color-jet-norm);
  color: var(--color-white-norm);
  padding: 4px 7px;
  border-radius: 10px 0 0 10px;
}

.top-link-right {
  background-color: var(--color-jet-norm);
  color: var(--color-white-norm);
  padding: 4px 7px;
  border-radius: 0 10px 10px 0;
  min-width: 150px;
} */

header a:not(:last-of-type)::after {
  margin: 0 10px 0 10px;
  content: '|';
  color: var(--text-norm-norm);
  border-right: 1px solid white;
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
