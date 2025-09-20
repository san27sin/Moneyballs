import { defineStore } from "pinia";
import {computed, ref} from "vue";
import { uid, Notify } from "quasar";

export const useStoreEntries = defineStore('entries', () => {
  // state
  const entries = ref([
    {
      id: 'id1',
      name: 'Salary',
      amount:   4999.9,
      paid: false,
    },
    {
      id: 'id2',
      name: 'Rent',
      amount: -999,
      paid: false,
    },
    {
      id: 'id3',
      name: 'Phone',
      amount: -14.99,
      paid: false,
    },
    {
      id: 'id4',
      name: 'Unknown',
      amount: 0,
      paid: false,
    },
  ])

  // getters

  const balance = computed(() => {
    return entries.value.reduce((accumulator, { amount }) => {
      return accumulator + amount
    }, 0)
  })

  const balancePaid = computed(() => {
    return entries.value.reduce((accumulator, { amount, paid }) => {
      return paid ? accumulator + amount : accumulator
    }, 0)
  })

  // actions
  const addEntry = addEntryForm => {
    const newEntry = Object.assign({}, addEntryForm, {
      id: uid(),
      paid: false,
    })
    entries.value.push(newEntry)
  }

  const deleteEntry = (entryId) => {
    const index = getEntryIndexById(entryId)
    entries.value.splice(index, 1)
    Notify.create({
      message: 'Entry deleted',
      position: 'top',
    })
  }

  const updateEntry = (entryId, updates) => {
    const index = getEntryIndexById(entryId)
    Object.assign(entries.value[index], updates)
  }

  const getEntryIndexById = entryId => entries.value.findIndex(entry => entry.id === entryId)

  // return
  return {
    entries,
    balance,
    balancePaid,
    addEntry,
    deleteEntry,
    updateEntry,
  }
})
