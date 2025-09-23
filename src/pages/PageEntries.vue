<template>
  <q-page>
    <div class="q-pa-md">
      <NothingHere
        v-if="!storeEntries.entries.length"
      />
      <q-list
        v-else
        bordered
        separator
      >
        <Sortable
          :list="storeEntries.entries"
          item-key="id"
          tag="div"
        >
          <template #item="{element}">
            <Entry
              :key="element.id"
              :entry="element"
            />
          </template>
        </Sortable>
      </q-list>
    </div>

    <q-footer
      class="bg-transparent"
    >
      <Balance/>
      <AddEntry/>
    </q-footer>
  </q-page>
</template>

<script setup>
import { useStoreEntries } from "src/stores/storeEntries.js"
import Balance from "components/Entries/Balance.vue";
import AddEntry from "components/Entries/AddEntry.vue";
import Entry from "components/Entries/Entry.vue";
import NothingHere from "components/Entries/NothingHere.vue";
import { Sortable } from "sortablejs-vue3";

const storeEntries = useStoreEntries()
</script>
