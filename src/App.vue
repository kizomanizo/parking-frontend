<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAlert, useLoading } from './stores/store'
import FooterComponent from './components/FooterComponent.vue'
import AlertBox from './components/AlertBox.vue'
import LoadingBox from './components/LoadingBox.vue'
</script>

<template>
  <div class="page-wrapper">
    <AlertBox
      :title="useAlert.title"
      :message="useAlert.message"
      :type="useAlert.type"
      v-if="useAlert.visible"
    />
    <LoadingBox v-if="useLoading.visible" />
    <header class="page-header">
      <h1 class="header-heading">Check Parking Fees</h1>
      <nav class="header-nav">
        <RouterLink to="/">Check Fees</RouterLink>
        <RouterLink to="/history">History</RouterLink>
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
}

header a:not(:last-of-type)::after {
  margin: 0 10px 0 10px;
  content: '|';
  color: var(--text-norm-norm);
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
