import { defineStore } from 'pinia'

export const useCookieStore = defineStore('cookie', {
  state: () => ({
    accepted: false,
  }),
  actions: {
    accept() {
      this.accepted = true
      localStorage.setItem('cookiesAccepted', 'true')
    },
    load() {
      this.accepted = localStorage.getItem('cookiesAccepted') === 'true'
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
})
