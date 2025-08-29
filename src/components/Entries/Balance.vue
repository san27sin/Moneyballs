<script setup>
import { useAmountColorClass } from "src/use/useAmountColorClass.js";
import { useCurrencify } from "src/use/useCurrencify.js";
import { useStoreEntries } from "src/stores/storeEntries.js"

const storeEntries = useStoreEntries()
</script>

<template>
  <div class="row q-mb-sm q-px-md q-py-sm shadow-up-3">
    <div class="col text-grey-7 text-h6">
      Balance:
    </div>
    <div
      :class="useAmountColorClass(storeEntries.balance)"
      class="col text-h6 text-right"
    >
      {{ useCurrencify(storeEntries.balance) }}
    </div>
  </div>
</template>

<style scoped>

</style>
