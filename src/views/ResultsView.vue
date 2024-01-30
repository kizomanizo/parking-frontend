<template>
  <section>
    <h3 class="prompt-text">{{ payerName }} Parking Bills</h3>
  </section>

  <section class="bill-wrapper bill-header">
    <div class="bill-item">Control #</div>
    <div class="bill-item">Amount</div>
    <div class="bill-item">Hours</div>
    <div class="bill-item">Tickets</div>
  </section>

  <section class="text-entry" v-for="(response, index) in responses" :key="index">
    <span class="bill-number">Bill: {{ index + 1 }}</span>
    <div class="bill-wrapper bill-entries">
      <div class="bill-item">
        <span class="bill-label">Bill Control Number: </span>{{ response.billControlNumber }}
      </div>
      <div class="bill-item">
        <span class="bill-label">Bill Total: </span>{{ response.billedAmount }}Shs
      </div>
      <div class="bill-item">
        <span class="bill-label">Bill Hours: </span>{{ sumOfBillAmounts[index] }}hrs
      </div>
      <div class="bill-tickets">
        <div class="ticket">
          <div class="ticket-item ticket-header">Date</div>
          <div class="ticket-item ticket-header">Amount</div>
          <div class="ticket-item ticket-header">Hours</div>
          <div class="ticket-item ticket-header">Location</div>
        </div>
        <div class="ticket" v-for="(ticketItem, index) in response.ticketItems" :key="index">
          <div class="ticket-item">{{ ticketItem.dateScanned }}</div>
          <div class="ticket-item">{{ ticketItem.billItemAmount }}</div>
          <div class="ticket-item">{{ ticketItem.billItemDescription }}</div>
          <div class="ticket-item item-details">{{ ticketItem.otherItemDescription }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useResponse } from '@/stores/store'

const responses = JSON.parse(useResponse.responses)
const payerName = responses[0].payerName
// Iterate through each bill
const sumOfBillAmounts: number[] = responses.map((bill: any) => {
  // Iterate through ticket items of each bill and sum billItemAmount
  const sum = bill.ticketItems.reduce((acc: any, ticketItem: any) => {
    // Extract hours from billItemDescription
    const hoursMatch = ticketItem.billItemDescription.match(/\d+/)
    const hours = hoursMatch ? parseInt(hoursMatch[0], 10) : 0

    return acc + hours
  }, 0)

  return sum
})
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
  border-top: 1px dashed var(--border-hover);
}

.bill-tickets {
  display: flex;
  flex-direction: column;
}

.ticket {
  display: grid;
  flex-direction: row;
  grid-template-columns: 1fr 1fr 1fr 3fr;
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
    align-items: flex-start;
    justify-content: space-around;
    font-size: 0.8rem;
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
    grid-template-columns: 2fr 0.8fr 1.2fr 3fr;
  }

  .bill-item,
  .ticket-item {
    border-left: none;
  }

  .bill-entries {
    border-bottom: 5px dashed var(--border-hover);
    border-top: none;
  }

  .ticket-header {
    display: inline;
    font-weight: bold;
    border-bottom: 1px solid var(--border-hover);
  }
}
</style>
