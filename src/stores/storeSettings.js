import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'
import { Dark, LocalStorage } from 'quasar'

export const useStoreSettings = defineStore('settings', () => {
  const settings = reactive({
    promptToDelete: true,
    showRunningBalance: false,
    currencySymbol: '$',
    darkMode: false,
  })

  // watch darkMode
  watch(() => settings.darkMode, value => {
    Dark.set(value)
  }, { immediate: true })

  // watch settings
  watch(settings, () => {
    saveSettings()
  })

  const saveSettings = () => {
    LocalStorage.set('settings', settings)
  }

  const loadSettings = () => {
    const savedSettings = LocalStorage.getItem('settings')
    if (savedSettings) {
      Object.assign(settings, savedSettings)
    }
  }

  return {
    settings,
    loadSettings
  }
})
