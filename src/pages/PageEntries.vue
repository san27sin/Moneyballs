<template>
  <q-page>
    <div class="q-pa-md">
      <transition
        appear
        enter-active-class="animated jackInTheBox slower"
      >
        <NothingHere
          v-if="!storeEntries.entries.length"
        />
      </transition>
      <q-list
        v-if="storeEntries.entries.length"
        class="entries"
      >
        <Sortable
          :list="storeEntries.entries"
          :options="options"
          item-key="id"
          tag="div"
          @end="storeEntries.sortEnd($event)"
        >
          <template #item="{ element, index }">
            <Entry
              :key="element.id"
              :entry="element"
              :index="index"
            />
          </template>
        </Sortable>
      </q-list>
    </div>

    <q-footer
      class="bg-transparent"
    >
      <transition
        appear
        enter-active-class="animated fadeInUp"
        leave-active-class="animated fadeOutDown"
      >
        <Balance v-if="storeEntries.entries.length"/>
      </transition>
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

const options = {
  handle: '.handle'
}
</script>
