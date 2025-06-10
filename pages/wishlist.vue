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
</template>
