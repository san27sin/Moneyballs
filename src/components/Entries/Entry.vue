<script setup>
import { useQuasar } from "quasar";
import { useStoreEntries } from "src/stores/storeEntries.js"
import {useAmountColorClass} from "src/use/useAmountColorClass.js";
import {useCurrencify} from "src/use/useCurrencify.js";
const storeEntries = useStoreEntries()

const $q = useQuasar()

const { entry } = defineProps({
  entry: {
    type: Object,
    required: true,
  }
})

const onNameUpdate = (value) => {
  storeEntries.updateEntry(entry.id, { name: value })
}

const onAmountUpdate = (value) => {
  storeEntries.updateEntry(entry.id, { amount: value })
}

const onEntrySlideRight = ({ reset }) => {
  $q.dialog({
    title: 'Delete Entry',
    message: `
      Delete this entry?
      <div class="q-mt-md text-weight-bold ${ useAmountColorClass(entry.amount) }">
        ${ entry.name } : ${ useCurrencify(entry.amount) }
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
    storeEntries.deleteEntry(entry.id)
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
        :class="useAmountColorClass(entry.amount)"
      >
        {{ entry.name }}
        <q-popup-edit
          :model-value="entry.name"
          style="opacity: 0.9"
          auto-save
          buttons
          label-set="Ok"
          v-slot="scope"
          :cover="false"
          @save="onNameUpdate"
        >
          <q-input
            v-model="scope.value"
            input-class="text-weight-bold letter-spacing-none"
            dense
            autofocus
            @keyup.enter="scope.set"
          />
        </q-popup-edit>
      </q-item-section>

      <q-item-section
        class="text-weight-bold"
        :class="useAmountColorClass(entry.amount)"
        side
      >
        {{ useCurrencify(entry.amount) }}
        <q-popup-edit
          :model-value="entry.amount"
          style="opacity: 0.9"
          auto-save
          buttons
          label-set="Ok"
          v-slot="scope"
          :cover="false"
          @save="onAmountUpdate"
        >
          <q-input
            v-model="scope.value"
            input-class="text-weight-bold letter-spacing-none"
            dense
            autofocus
            @keyup.enter="scope.set"
          />
        </q-popup-edit>
      </q-item-section>
    </q-item>
  </q-slide-item>
</template>

<style scoped>

</style>
