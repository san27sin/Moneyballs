<template>
  <router-view />
</template>

<script setup>
import { useStoreSettings } from 'stores/storeSettings.js'
import { onMounted } from 'vue'
import { useStoreEntries } from 'stores/storeEntries.js'

const storeSettings = useStoreSettings()
const storeEntries = useStoreEntries()

onMounted(() => {
  storeSettings.loadSettings()
  storeEntries.loadEntries()
})

// window.addEventListener('contextmenu', e => {
//   e.preventDefault()
// })
</script>
