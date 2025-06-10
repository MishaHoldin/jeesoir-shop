import { defineStore } from 'pinia';

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: [] as string[],
  }),
  actions: {
    toggle(id: string) {
      if (this.items.includes(id)) {
        this.items = this.items.filter(item => item !== id);
      } else {
        this.items.push(id);
      }
    },
    clear() {
      this.items = [];
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
