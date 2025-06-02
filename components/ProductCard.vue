<template>
  <NuxtLink :to="`/product/${data.documentId}`" class="text-center relative">

    <!-- Фото -->
    <NuxtImg
      class="mx-auto max-w-[311px]  sm:max-h-[300px] sm:min-h-[360px] h-[200px] w-full object-contain"
      provider="strapi"
      :src="data?.images?.[0]?.url"
      :alt="data?.Name"
    />
    <!-- Название -->
    <div class="font-light sm:text-[16px] text-[13px] text-[#252525] mt-[20px]">
      {{ data?.Name }}
    </div>

    <!-- Цена -->
    <div class="font-bold sm:text-[16px] text-[13px] text-[#252525] mt-[5px]">
      {{ data?.price }}€
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  data: Object,
})
</script>
