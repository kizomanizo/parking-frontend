<template>
  <section class="search-form">
    <input type="text" name="reg_number" id="reg_number" placeholder="e.g. T011AAX" class="form-text"
      v-model="regNumber" />
    <input type="button" class="form-button" value="Check Fees" @click="handleCheckParking(regNumber)" />
  </section>
  <section>
    <p class="prompt-text">Enter your plate number and press Check Fees</p>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { handleCheckParking } from '@/scripts/checkParking'

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
  text-align: center;
  font-weight: bold;
  font-size: 1.6rem;
  border-radius: 10px;
  border: 1px solid var(--border-norm);
}

.form-text:hover {
  border: 1px solid var(--border-hover);
}

.form-button {
  background-color: var(--button-norm);
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  max-width: 200px;
  color: var(--text-norm-norm);
  cursor: pointer;
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
