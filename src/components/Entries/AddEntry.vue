<script setup>
import {reactive, ref} from "vue";
import { useStoreEntries } from "src/stores/storeEntries.js"
import { useLightOrDark } from 'src/use/useLightOrDark.js'
import vSelectAll from 'src/directives/directiveSelectAll'

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
        v-select-all
        placeholder="Name"
        :bg-color="useLightOrDark('white', 'black')"
        outlined
        dense
      />
    </div>
    <div class="col">
      <q-input
        v-model.number="entry.amount"
        v-select-all
        input-class="text-right"
        placeholder="Amount"
        :bg-color="useLightOrDark('white', 'black')"
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
