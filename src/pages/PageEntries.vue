<template>
  <q-page>
    <div class="q-pa-md">
      <q-list>
        <q-item
          v-for="entry in entries"
          :key="entry.id"
        >
          <q-item-section>
            {{ entry.name }}
          </q-item-section>
          <q-item-section side>
            {{ currencify(entry.amount) }}
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const entries = ref([
  {
    id: 'id1',
    name: 'Salary',
    amount: 4999.9,
  },
  {
    id: 'id2',
    name: 'Rent',
    amount: -999,
  },
  {
    id: 'id3',
    name: 'Phone',
    amount: -14.99,
  },
  {
    id: 'id4',
    name: 'Unknown',
    amount: 0,
  },
])

function currencify(amount) {
  // format: "+ $ 4,999.99" | "- $ 999.99"
  const symbol = amount === 0 ? '' : amount > 0 ? '+' : '-'
  const amountPositive = Math.abs(amount)
  const currencySymbol = '$'
  const amountFormatted = amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return `${symbol} ${currencySymbol} ${amountFormatted}`
}
</script>
