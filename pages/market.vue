<template>
  <div class="bg-white text-gray-900 px-4 pt-10 pb-24 max-w-[1440px] w-full mx-auto">
    <div class="flex gap-[26px] mb-[40px]">
      <h2 class="font-light text-[16px] text-[#252525]">
        <NuxtLink to="/">Головна</NuxtLink>
      </h2>
      <h1 class="font-light text-[16px] text-[#252525]">Каталог</h1>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 ">
      <ProductCard
        v-for="product in productList"
        :key="product.documentId"
        :data="product"
      />
    </div>
  </div>
</template>

<script setup>
import { products } from '~/queries/market'
import ProductCard from '~/components/ProductCard.vue'

const { data } = await useAsyncQuery(products)
const productList = computed(() => data.value?.products || [])
</script>
