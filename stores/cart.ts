// stores/cart.js
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),

  getters: {
    totalPrice: (state) => {
      return state.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    },
    totalCount: (state) => {
      return state.items.reduce((acc, item) => acc + item.quantity, 0)
    }
  },

  actions: {
    addToCart(product) {
      const existing = this.items.find((item) => item.id === product.id && item.size === product.size)
      if (existing) {
        existing.quantity++
      } else {
        this.items.push({
          ...product,
          quantity: 1
        })
      }
    },

    removeFromCart(productId, size) {
      this.items = this.items.filter((item) => !(item.id === productId && item.size === size))
    },

    updateQuantity(productId, size, amount) {
      const item = this.items.find((item) => item.id === productId && item.size === size)
      if (item) {
        item.quantity += amount
        if (item.quantity < 1) {
          this.removeFromCart(productId, size)
        }
      }
    },

    clearCart() {
      this.items = []
    }
  },
  persist: {
    storage: persistedState.localStorage,
  },
})
