<template>
  <router-view />
</template>

<script setup>
import { useStoreSettings } from 'stores/storeSettings.js'
import { onMounted } from 'vue'

const storeSettings = useStoreSettings()

onMounted(() => {
  storeSettings.loadSettings()
})

// window.addEventListener('contextmenu', e => {
//   e.preventDefault()
// })
</script>
