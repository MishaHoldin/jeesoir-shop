<template>
  <div class="text-center relative">
    <!-- Сердце вне router-link -->
    <img
      :src="isFavorite ? '/favorite-active.svg' : '/favorite.svg'"
      @click.stop="toggleFavorite"
      class="absolute top-2 right-4 w-6 h-6 cursor-pointer z-10"
    />

    <router-link :to="`/product/${data.documentId}`">
      <!-- Фото -->
      <div class="relative">
        <NuxtImg
          class="mx-auto max-w-[311px] sm:max-h-[300px] sm:min-h-[360px] h-[200px] w-full object-cover"
          provider="strapi"
          :src="data?.images?.[0]?.url"
          :alt="data?.Name"
        />
      </div>

      <!-- Название -->
      <div class="font-light sm:text-[16px] text-[13px] text-[#252525] mt-[20px]">
        {{ data?.Name }}
      </div>

      <!-- Цена -->
      <div class="font-bold sm:text-[16px] text-[13px] text-[#252525] mt-[5px]">
        {{ data?.price }}€
      </div>
      <div
        v-if="['/market', '/wishlist'].includes(route.path)"
        class="flex justify-center gap-[5px] mt-[5px] text-[16px] font-light text-[#252525]/50"
      >
        <span
          v-for="size in data.sizes"
          :key="size.Name"
          class="uppercase"
        >
          {{ size.Name }}
        </span>
      </div>
    
    </router-link>
  </div>
</template>


<script setup>
const props = defineProps({
  data: Object,
});
const route = useRoute();

import { useWishlistStore } from '~/stores/wishlist';
const wishlist = useWishlistStore();

const isFavorite = computed(() => wishlist.items.includes(props.data.documentId));

const toggleFavorite = () => {
  wishlist.toggle(props.data.documentId);
};
</script>
