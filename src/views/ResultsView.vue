<template>
  <section>
    <h3 class="prompt-text">{{ payerName }} {{ t('results.heading') }}</h3>
  </section>

  <section class="bill-wrapper bill-header">
    <div class="bill-item">{{ t('results.controlNumber') }}</div>
    <div class="bill-item">{{ t('results.amount') }}</div>
    <div class="bill-item">{{ t('results.hours') }}</div>
    <div class="bill-item">{{ t('results.tickets') }}</div>
  </section>

  <section class="text-entry" v-for="(response, index) in responses" :key="index">
    <span class="bill-number">{{ t('results.bill') }}{{ index + 1 }}</span>
    <div class="bill-wrapper bill-entries">
      <div class="bill-item">
        <span class="bill-label">{{ t('results.billControlNumber') }}</span>
        <span class="control-number">{{ response.billControlNumber }}</span>
      </div>
      <div class="bill-item">
        <span class="bill-label">{{ t('results.billTotalAmount') }}</span>
        {{ formatNumberWithCommas(Number(response.outStandingAmount)) }} Shs
      </div>
      <div class="bill-item">
        <span class="bill-label">{{ t('results.billTotalHours') }}</span>{{ sumOfBillAmounts[index] }}hrs
      </div>
      <div class="bill-tickets">
        <div class="ticket ticket-heading">
          <div class="ticket-item ticket-header">{{ t('results.date') }}</div>
          <div class="ticket-item ticket-header">{{ t('results.amount') }}</div>
          <div class="ticket-item ticket-header">{{ t('results.hours') }}</div>
          <div class="ticket-item ticket-header">{{ t('results.location') }}</div>
        </div>
        <div class="ticket" v-for="(ticketItem, index) in response.ticketItems" :key="index">
          <div class="ticket-item">{{ ticketItem.dateScanned }}</div>
          <div class="ticket-item" v-if="Number(ticketItem.billItemAmount) <= 0">
            {{ t('results.paid') }}
          </div>
          <div class="ticket-item" v-else>
            {{ formatNumberWithCommas(Number(ticketItem.billItemAmount)) }} Shs
          </div>
          <div class="ticket-item">{{ ticketItem.billItemDescription }}</div>
          <div class="ticket-item item-details">
            <div v-for="(item, itemIndex) in ticketItem.otherItemDescription.split(',')" :key="itemIndex"
              class="detail-line">
              {{ item.trim() }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useResponse } from '@/stores/store'
import { useI18n } from 'vue-i18n';

// Parse responses as an array
const responses = JSON.parse(useResponse.responses)
const payerName = responses[0]?.payerName || 'Unknown'

// Calculate the sum of hours for each bill
const sumOfBillAmounts: number[] = responses.map((bill: any) => {
  return bill.ticketItems.reduce((acc: number, ticketItem: any) => {
    const hoursMatch = ticketItem.billItemDescription.match(/\d+/)
    const hours = hoursMatch ? parseInt(hoursMatch[0], 10) : 0
    return acc + hours
  }, 0)
});
const { t } = useI18n();

// Format a number with commas
function formatNumberWithCommas(number: number): string {
  if (isNaN(number)) {
    return '0'
  }
  return number.toLocaleString()
}
</script>


<style>
section {
  min-width: 100%;
  margin-top: 10px;
}

.text-entry {
  display: flex;
  flex-direction: column;
}

.bill-wrapper {
  width: 60vw;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr 0.8fr 4.2fr;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  font-size: 1rem;
}

.bill-label {
  visibility: hidden;
  display: none;
  font-weight: bold;
}

.bill-header {
  border-bottom: 5px dashed var(--border-hover);
  font-weight: bold;
}

.bill-entries {
  /* border-top: 1px dashed var(--border-hover); */
  box-shadow: 5px 5px 4px var(--border-hover);
}

.bill-tickets {
  display: flex;
  flex-direction: column;
}

.ticket {
  display: grid;
  flex-direction: row;
  grid-template-columns: 1.2fr 1.1fr 1fr 4fr;
}

.bill-item,
.ticket-item {
  border-left: 1px dashed var(--border-hover);
  margin: 0 3px;
}

.bill-number {
  margin-left: -50px;
  text-decoration: underline;
  font-weight: bold;
  font-size: smaller;
}

.ticket-header {
  display: none;
}

.item-details {
  display: flex;
  flex-direction: column;
}

.detail-line {
  border-bottom: 1px dashed var(--border-hover);
}

.control-number {
  background-color: var(--color-white-mute);
  padding: 2px 6px;
  border-radius: 15px;
  font-size: smaller;
}

@media (max-width: 1024px) {
  section {
    width: 100%;
  }

  .text-entry {
    width: 100%;
    margin-top: 5px;
  }

  .bill-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    margin-left: 5px;
  }

  .bill-header {
    visibility: hidden;
    display: none;
  }

  .bill-label {
    visibility: visible;
    display: inline;
  }

  .ticket {
    grid-template-columns: 1.4fr 1.3fr 1.1fr 3.8fr;
  }

  .bill-item,
  .ticket-item {
    border-left: none;
  }

  .bill-entries {
    border: 1px solid var(--border-hover);
    border-top: none;
  }

  .ticket-header {
    display: inline;
    font-weight: bold;
    border-bottom: 1px solid var(--border-hover);
  }

  .ticket-heading {
    background-color: var(--color-jet-norm);
    color: var(--color-white-norm);
  }

  .bill-number {
    display: none;
  }
}
</style>
