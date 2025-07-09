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

  <!-- Regular responses section -->
  <section class="text-entry" v-for="(response, index) in responses" :key="index">
    <span class="bill-number">{{ t('results.bill') }}{{ index + 1 }}</span>
    <div class="bill-wrapper bill-entries">
      <div class="bill-item">
        <span class="bill-label">{{ t('results.billControlNumber') }}</span>
        <span class="control-number">{{ response.billControlNumber }}</span>
      </div>
      <div class="bill-item">
        <span class="bill-label">{{ t('results.billTotalAmount') }}</span>
        {{ formatNumberWithCommas(Number(response.outStandingAmount) + Number(sumOfTausiAmounts)) }} Shs
      </div>
      <div class="bill-item">
        <span class="bill-label">{{ t('results.billTotalHours') }}</span>{{ sumOfBillAmounts[index] +
          Number(tausis.length) }}hrs
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
        <div class="ticket" v-for="(tausiItem, tausiIndex) in tausis" :key="`tausi-${tausiIndex}`">
          <div class="ticket-item">{{ formatDateTime(tausiItem.parkingDetail.startTime).date }}</div>
          <div class="ticket-item" v-if="Number(tausiItem.payableAmount) <= 0">
            {{ t('results.paid') }}
          </div>
          <div class="ticket-item" v-else>
            {{ formatNumberWithCommas(Number(tausiItem.payableAmount)) }} Shs
          </div>
          <div class="ticket-item">{{ '1 ' + (tausiItem.parkingDetail.paymentPlan.charAt(0).toUpperCase() +
            tausiItem.parkingDetail.paymentPlan.toLowerCase().slice(1)) }}</div>
          <div class="ticket-item detail-line2">{{ formatDateTime(tausiItem.parkingDetail.startTime).time + " - "
            +
            locationNames.get(`${tausiItem.parkingDetail.coordinatePoint.x},${tausiItem.parkingDetail.coordinatePoint.y}`)
            || 'Loading...' }}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Tausi-only section (when no regular responses) -->
  <section class="text-entry" v-if="responses.length === 0 && tausis.length > 0">
    <span class="bill-number">{{ t('results.bill') }}1</span>
    <div class="bill-wrapper bill-entries">
      <div class="bill-item">
        <span class="bill-label">{{ t('results.billControlNumber') }}</span>
        <span class="control-number">TAUSI</span>
      </div>
      <div class="bill-item">
        <span class="bill-label">{{ t('results.billTotalAmount') }}</span>
        {{ formatNumberWithCommas(Number(sumOfTausiAmounts)) }} Shs
      </div>
      <div class="bill-item">
        <span class="bill-label">{{ t('results.billTotalHours') }}</span>{{ tausis.length }}hrs
      </div>
      <div class="bill-tickets">
        <div class="ticket ticket-heading">
          <div class="ticket-item ticket-header">{{ t('results.date') }}</div>
          <div class="ticket-item ticket-header">{{ t('results.amount') }}</div>
          <div class="ticket-item ticket-header">{{ t('results.hours') }}</div>
          <div class="ticket-item ticket-header">{{ t('results.location') }}</div>
        </div>
        <div class="ticket" v-for="(tausiItem, tausiIndex) in tausis" :key="`tausi-only-${tausiIndex}`">
          <div class="ticket-item">{{ formatDateTime(tausiItem.parkingDetail.startTime).date }}</div>
          <div class="ticket-item" v-if="Number(tausiItem.payableAmount) <= 0">
            {{ t('results.paid') }}
          </div>
          <div class="ticket-item" v-else>
            {{ formatNumberWithCommas(Number(tausiItem.payableAmount)) }} Shs
          </div>
          <div class="ticket-item">{{ '1 ' + (tausiItem.parkingDetail.paymentPlan.charAt(0).toUpperCase() +
            tausiItem.parkingDetail.paymentPlan.toLowerCase().slice(1)) }}</div>
          <div class="ticket-item detail-line2">{{ formatDateTime(tausiItem.parkingDetail.startTime).time + " - "
            +
            locationNames.get(`${tausiItem.parkingDetail.coordinatePoint.x},${tausiItem.parkingDetail.coordinatePoint.y}`)
            || 'Loading...' }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useResponse } from '@/stores/store'
import { useI18n } from 'vue-i18n';
import { locationNamer } from '@/scripts/locationNamer'

// Parse responses as an array (keep original working logic)
const responses = useResponse.responses && useResponse.responses !== 'null' ? JSON.parse(useResponse.responses) : []
// Parse tausi from separate localStorage entry - ensure it's always an array
const tausis = useResponse.tausi && useResponse.tausi !== 'null' ? JSON.parse(useResponse.tausi) : []
// Get payer name from responses or use plate number from tausi if no responses
const payerName = responses[0]?.payerName || tausis[0]?.plateNumber || 'Unknown'

// Calculate the sum of hours for each bill
const sumOfBillAmounts: number[] = responses.map((bill: any) => {
  return bill.ticketItems.reduce((acc: number, ticketItem: any) => {
    const hoursMatch = ticketItem.billItemDescription.match(/\d+/)
    const hours = hoursMatch ? parseInt(hoursMatch[0], 10) : 0
    return acc + hours
  }, 0)
});

// Calculate the sum of tausi payable amounts
const sumOfTausiAmounts: number = Array.isArray(tausis) ? tausis.reduce((acc: number, tausiItem: any) => {
  return acc + Number(tausiItem.payableAmount) || 0
}, 0) : 0;
const { t } = useI18n();


// Format a number with commas
function formatNumberWithCommas(number: number): string {
  if (isNaN(number)) {
    return '0'
  }
  return number.toLocaleString()
}

// Format date and time from startTime string
function formatDateTime(startTime: string) {
  // Handle null, undefined, or empty string
  if (!startTime || typeof startTime !== 'string') {
    return { time: 'N/A', date: 'N/A' }
  }

  try {
    const date = new Date(startTime)

    // Check if date is valid
    if (isNaN(date.getTime())) {
      // If invalid date, try to parse the string manually
      const parts = startTime.split(' ')
      if (parts.length === 2) {
        const datePart = parts[0]
        const timePart = parts[1]
        return { time: timePart, date: datePart }
      }
      return { time: 'Invalid', date: 'Invalid' }
    }

    // Format time as HH:MM
    const time = date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit'
    })

    // Format date as YYYY-MM-DD
    const dateStr = date.toISOString().split('T')[0]

    return { time, date: dateStr }
  } catch (error) {
    // Fallback: try to parse manually
    const parts = startTime.split(' ')
    if (parts.length === 2) {
      const datePart = parts[0]
      const timePart = parts[1]
      return { time: timePart, date: datePart }
    }
    return { time: 'Error', date: 'Error' }
  }
}

// Create a reactive map to store location names
const locationNames = ref(new Map())

// Load location names for tausi items
const loadLocationNames = async () => {
  // Ensure tausis is an array before iterating
  if (!Array.isArray(tausis)) {
    return
  }

  for (const tausiItem of tausis) {
    const lat = tausiItem.parkingDetail.coordinatePoint.x
    const long = tausiItem.parkingDetail.coordinatePoint.y
    const key = `${lat},${long}`

    if (!locationNames.value.has(key)) {
      const name = await locationNamer(lat, long)
      locationNames.value.set(key, name)
    }
  }
}

// Load location names when component mounts
loadLocationNames()

// Debug: Log the data to see what we're working with
console.log('useResponse.responses:', useResponse.responses)
console.log('useResponse.tausi:', useResponse.tausi)
console.log('Parsed responses:', responses)
console.log('Parsed tausis:', tausis)
console.log('Payer name:', payerName)

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

.detail-line2 {
  border-bottom: 1px dashed lightskyblue;
}

.control-number {
  background-color: var(--background-hover);
  color: var(--text-norm-norm);
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
