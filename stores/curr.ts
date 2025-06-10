import { defineStore } from 'pinia'

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    selectedCurrency: 'UAH'
  }),
  actions: {
    setCurrency(currency: string) {
      this.selectedCurrency = currency
    }
  },
  persist: {
    storage: persistedState.localStorage,
  },
})
