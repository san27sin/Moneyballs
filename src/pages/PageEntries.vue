<template>
  <q-page>
    <div class="q-pa-md">
      <q-list>
        <q-item
          v-for="entry in entries"
          :key="entry.id"
        >
          <q-item-section
            class="text-weight-bold"
            :class="useAmountColorClass(entry.amount)"
          >
            {{ entry.name }}
          </q-item-section>

          <q-item-section
            class="text-weight-bold"
            :class="useAmountColorClass(entry.amount)"
            side
          >
            {{ useCurrencify(entry.amount) }}
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <q-footer
      class="bg-transparent"
    >
      <div class="row q-mb-sm q-px-md q-py-sm shadow-up-3">
        <div class="col text-grey-7 text-h6">
          Balance:
        </div>
        <div
          :class="useAmountColorClass(balance)"
          class="col text-h6 text-right"
        >
          {{ useCurrencify(balance) }}
        </div>
      </div>
      <q-form
        class="row q-px-sm q-pb-sm q-col-gutter-sm bg-primary"
        @submit="addEntry"
      >
        <div class="col">
          <q-input
            ref="nameRef"
            v-model="entry.name"
            placeholder="Name"
            bg-color="white"
            outlined
            dense
          />
        </div>
        <div class="col">
          <q-input
            v-model.number="entry.amount"
            input-class="text-right"
            placeholder="Amount"
            bg-color="white"
            type="number"
            step="0.01"
            outlined
            dense
          />
        </div>
        <div class="col col-auto">
          <q-btn
            round
            color="primary"
            icon="add"
            type="submit"
          />
        </div>
      </q-form>
    </q-footer>
  </q-page>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import {useCurrencify} from "../use/useCurrencify.js";
import {useAmountColorClass} from "src/use/useAmountColorClass.js";
import {uid} from "quasar";

const entries = ref([
  {
    id: 'id1',
    name: 'Salary',
    amount:   4999.9,
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

const balance = computed(() => {
  return entries.value.reduce((accumulator, { amount }) => {
    return accumulator + amount
  }, 0)
})

const nameRef = ref(null)

const addEntryFormDefault = {
  name: '',
  amount: null,
}

const entry = reactive({
  ...addEntryFormDefault
})

const addEntryFormReset = () => {
 Object.assign(entry, addEntryFormDefault)
  nameRef.value.focus()
}

const addEntry = () => {
  const newEntry = Object.assign({}, entry, { id: uid() })
  entries.value.push(newEntry)
  addEntryFormReset()
}
</script>
