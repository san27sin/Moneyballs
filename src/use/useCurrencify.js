import { useStoreSettings } from 'stores/storeSettings.js'

const storeSettings = useStoreSettings()

export function useCurrencify(amount) {
  // format: "+ $ 4,999.99" | "- $ 999.99"
  const plusMinosSign = amount === 0 ? '' : amount > 0 ? '+' : '-'
  const amountPositive = Math.abs(amount)
  const currencySymbol = storeSettings.settings.currencySymbol
  const amountFormatted = amountPositive.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return `${plusMinosSign} ${currencySymbol} ${amountFormatted}`
}
