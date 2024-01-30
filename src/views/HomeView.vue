<template>
  <section class="search-form">
    <input type="text" name="reg_number" id="reg_number" placeholder="e.g. T011AAX" class="form-text"
      v-model="regNumber" />
    <input type="button" class="form-button" value="Check Fees" @click="handleCheckParking()" />
  </section>
  <section>
    <p class="prompt-text">Enter your plate number and press Check Fees</p>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import showAlert from '@/scripts/showAlert'
import { useLoading, useResponse, usePath, useHistory } from '@/stores/store'
import { useRouter } from 'vue-router'

const router = useRouter()
const regNumber = ref('')
const tzRegex = /^[Tt]\d{3}[A-Za-z]{3}$/

const handleCheckParking = async () => {
  if (useLoading.visible) return
  useLoading.toggleVisibility(true)
  try {
    if (tzRegex.test(regNumber.value)) {
      console.log('entry matches', regNumber.value)
      const termisUrl = import.meta.env.VITE_TERMIS_ENDPOINT
      const termisResponse = await axios.get(termisUrl + regNumber.value, {
        headers: {
          'x-transfer-key': 'e9f3e572-db87-4eff-9ed6-66922f1f7f24'
        }
      })
      // Store the token in Vue store
      const response = termisResponse.data
      if (!response.status) {
        console.log('No bills found!', regNumber.value)
        showAlert('alert-warning', 'WARNING', `${regNumber.value} has no bills!!`)
        return
      }
      // Add the REG to the history
      useHistory.setHistory(regNumber.value)
      useResponse.setResponse(JSON.stringify(response.data))
      usePath.changeName('results')
      await router.push('/results')
    } else {
      console.log('entry mismatch', regNumber.value)
      showAlert('alert-danger', 'Error', `${regNumber.value} is an invalid plate number`)
    }
  } catch (error: any) {
    console.error(error.message)
  } finally {
    useLoading.toggleVisibility(false)
  }
}
</script>

<style scoped>
.search-form {
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 450px;
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
}

.form-button:hover {
  background-color: var(--button-hover);
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
