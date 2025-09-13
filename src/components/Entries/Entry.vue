<script setup>
import { useQuasar } from "quasar";
import { useStoreEntries } from "src/stores/storeEntries.js"
import {useAmountColorClass} from "src/use/useAmountColorClass.js";
import {useCurrencify} from "src/use/useCurrencify.js";
const storeEntries = useStoreEntries()

const $q = useQuasar()

const { idx } = defineProps(['idx'])

const onEntrySlideRight = ({ reset }) => {
  $q.dialog({
    title: 'Delete Entry',
    message: `
      Delete this entry?
      <div class="q-mt-md text-weight-bold ${ useAmountColorClass(storeEntries.entries[idx].amount) }">
        ${ storeEntries.entries[idx].name } : ${ useCurrencify(storeEntries.entries[idx].amount) }
      </div>
    `,
    html: true,
    persistent: true,
    ok: {
      label: 'Delete',
      color: 'negative',
      noCaps: true
    },
    cancel: {
      color: 'primary',
      noCaps: true
    },
  }).onOk(() => {
    storeEntries.deleteEntry(storeEntries.entries[idx].id)
  }).onCancel(() => {
    reset()
  })
}
</script>

<template>
  <q-slide-item
    left-color="positive"
    right-color="negative"
    @right="onEntrySlideRight"
  >
    <template v-slot:right>
      <q-icon name="delete" />
    </template>

    <q-item>
      <q-item-section
        class="text-weight-bold"
        :class="useAmountColorClass(storeEntries.entries[idx].amount)"
      >
        {{ storeEntries.entries[idx].name }}
        <q-popup-edit
          v-model="storeEntries.entries[idx].name"
          style="opacity: 0.9"
          auto-save
          v-slot="scope"
          :cover="false"
        >
          <q-input
            v-model="scope.value"
            input-class="text-weight-bold"
            dense
            autofocus
            counter
            @keyup.enter="scope.set"
          />
        </q-popup-edit>
      </q-item-section>

      <q-item-section
        class="text-weight-bold"
        :class="useAmountColorClass(storeEntries.entries[idx].amount)"
        side
      >
        {{ useCurrencify(storeEntries.entries[idx].amount) }}
      </q-item-section>
    </q-item>
  </q-slide-item>
</template>

<style scoped>

</style>
