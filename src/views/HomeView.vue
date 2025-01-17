<template>
  <section class="search-form">
    <input type="text" name="reg_number" id="reg_number" :placeholder="$t('home.example')" class="form-text"
      v-model="regNumber" />
    <input type="button" class="form-button" :value="$t('home.actionButton')" @click="handleCheckParking(regNumber)"
      @keydown.enter="handleCheckParking" />
  </section>
  <section>
    <p class="prompt-text">{{ t('home.instructions') }}</p>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n';
import { handleCheckParking } from '@/scripts/checkParking'

const { t } = useI18n();
const regNumber = ref('')
</script>

<style scoped>
.search-form {
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 450px;
  align-items: center;
  justify-content: center;
}

.search-form input {
  min-width: 250px;
  min-height: 22px;
  min-height: 40px;
  margin: 15px;
}

.form-text {
  background: var(--color-white-cool);
  text-align: center;
  font-weight: normal;
  font-size: 1.6rem;
  border-radius: 5px;
  border: 1px solid var(--border-norm);
  text-transform: uppercase;
}

.form-text:hover {
  border: 1px solid var(--border-hover);
}

.form-text::placeholder {
  text-transform: none;
}

.form-button {
  background-color: var(--button-norm);
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  max-width: 200px;
  color: var(--text-norm-norm);
  cursor: pointer;
  transition: 600ms;
}

.form-button:hover {
  background-color: var(--button-hover);
  color: var(--color-white-norm);
}

.form-button:active {
  background-color: var(--button-hover);
  color: var(--color-white-norm);
}

@media (max-width: 1024px) {
  .search-form {
    width: 80%;
  }

  .search-form input {
    min-height: 55px;
    margin: 30px 10px;
    font-size: 1.6rem;
    text-align: center;
  }
}
</style>
