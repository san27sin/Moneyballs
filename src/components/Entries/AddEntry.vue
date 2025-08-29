<script setup>
import {reactive, ref} from "vue";
import { useStoreEntries } from "src/stores/storeEntries.js"

const storeEntries = useStoreEntries()

const nameRef = ref(null)

const addEntryFormReset = () => {
  Object.assign(entry, addEntryFormDefault)
}

const addEntryFormSubmit = () => {
  storeEntries.addEntry(entry)
  addEntryFormReset()
}

const addEntryFormDefault = {
  name: '',
  amount: null,
}

const entry = reactive({
  ...addEntryFormDefault
})
</script>

<template>
  <q-form
    class="row q-px-sm q-pb-sm q-col-gutter-sm bg-primary"
    @submit="addEntryFormSubmit"
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
</template>

<style scoped>

</style>
