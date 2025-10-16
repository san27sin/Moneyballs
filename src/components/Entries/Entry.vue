<script setup>
import { useQuasar } from "quasar";
import { useStoreEntries } from "src/stores/storeEntries.js"
import {useAmountColorClass} from "src/use/useAmountColorClass.js";
import {useCurrencify} from "src/use/useCurrencify.js";
import vSelectAll from 'src/directives/directiveSelectAll'
import { useStoreSettings } from 'stores/storeSettings.js'

const storeEntries = useStoreEntries()
const storeSettings = useStoreSettings()

const $q = useQuasar()

const { entry } = defineProps({
  entry: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  }
})

const onNameUpdate = (value) => {
  storeEntries.updateEntry(entry.id, { name: value })
}

const onAmountUpdate = (value) => {
  storeEntries.updateEntry(entry.id, { amount: value })
}

const onEntrySlideLeft = ({ reset }) => {
  storeEntries.updateEntry(entry.id, { paid: !entry.paid })
  reset()
}

const onEntrySlideRight = ({ reset }) => {
  if (storeSettings.settings.promptToDelete) {
    promptToDelete(reset)
  }
  else {
    storeEntries.deleteEntry(entry.id)
  }
}

const promptToDelete = (reset) => {
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
    :class="{ 'bg-grey-2': entry.paid }"
    @left="onEntrySlideLeft"
    @right="onEntrySlideRight"
  >
    <template v-slot:left>
      <q-icon name="done" />
    </template>
    <template v-slot:right>
      <q-icon name="delete" />
    </template>

    <q-item
      class="row"
    >
      <q-item-section
        class="text-weight-bold col"
        :class="[
          useAmountColorClass(entry.amount),
          { 'text-strike': entry.paid }
        ]"
      >
        {{ entry.name }}
        <q-popup-edit
          :model-value="entry.name"
          style="opacity: 0.9"
          auto-save
          buttons
          label-set="Ok"
          anchor="top right"
          self="right"
          v-slot="scope"
          :cover="false"
          @save="onNameUpdate"
        >
          <q-input
            v-model="scope.value"
            v-select-all
            input-class="text-weight-bold letter-spacing-none"
            dense
            autofocus
            @keyup.enter="scope.set"
          />
        </q-popup-edit>
      </q-item-section>

      <q-item-section
        class="text-weight-bold relative-position col"
        :class="[
          useAmountColorClass(entry.amount),
        ]"
        side
      >
        <span
          :class="{ 'text-strike': entry.paid }"
        >
          {{ useCurrencify(entry.amount) }}
        </span>
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
            v-select-all
            input-class="text-weight-bold letter-spacing-none"
            dense
            autofocus
            @keyup.enter="scope.set"
          />
        </q-popup-edit>
        <q-chip
          v-if="storeSettings.settings.showRunningBalance"
          :class="useAmountColorClass(storeEntries.runningBalances[index])"
          class="running-balance absolute-bottom-right"
          size="9px"
          outline
          dense
        >
          {{ useCurrencify(storeEntries.runningBalances[index]) }}
        </q-chip>
      </q-item-section>

      <q-item-section
        v-if="storeEntries.options.sort"
        side
      >
        <q-icon
          class="handle"
          name="reorder"
          color="primary"
        />
      </q-item-section>
    </q-item>
  </q-slide-item>
</template>

<style scoped>

</style>
