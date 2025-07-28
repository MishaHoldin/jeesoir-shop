<script setup lang="ts">
import { useWishlistStore } from '~/stores/wishlist';
import { products } from '~/queries/market';

const wishlist = useWishlistStore();
const variables = ref({
  filters: {
    documentId: {
      in: wishlist.items,
    },
  },
});

// Перезапуск запроса при изменении wishlist
watch(
  () => wishlist.items,
  (newItems) => {
    variables.value.filters.documentId.in = newItems;
  },
  { immediate: true }
);

const { data } = useAsyncQuery(products, variables);
</script>
<template>

  <div
    class="bg-white text-gray-900 px-4 pt-10 pb-24 max-w-[960px] w-full mx-auto"
  >
  <div v-if="wishlist?.items?.length === 0" class="flex flex-col items-center justify-center min-h-[400px] text-center">
    <p class="text-[#C4C4C4] text-[36px] sm:text-[48px] font-[300] mb-6">Обрані моделі ще не додано</p>
    <router-link
      to="/market"
      class="font-light w-full text-[16px] max-w-[480px] uppercase text-center text-[#102840] border-[#102840] border-[0.5px] py-4 px-0 mb-[20px] hover:bg-[#102840] hover:text-white active:bg-[#6d849a] active:text-white"
    >
      Продовжити покупки
    </router-link>
  </div>
  <div v-else>
    <div class="flex gap-[26px] mb-[40px]">
      <h1 class="font-light text-[16px] text-[#252525]">Обрані</h1>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
      <ProductCard
        v-for="product in data?.products"
        :key="product.documentId"
        :data="product"
      />
    </div>
  </div>
  </div>
</template>
