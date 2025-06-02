<template>
  <div class="bg-white text-gray-900 font-sans">
    <!-- HERO BLOCK -->
    <section
      class="relative bg-gray-100 sm:h-screen sm:max-h-[720px] min-h-[200px] w-full flex items-center justify-center flex-col py-16 px-4 text-center gap-[6px]"
      :style="{
        backgroundImage: `url('${returnData?.banner?.image?.url}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
      }"
    >
      <div class="flex flex-col">
        <h1 class="font-bold sm:text-[46px] text-[20px] text-center text-white">
          {{ returnData?.banner?.Title }}
        </h1>
        <NuxtLink
          :to="returnData?.banner?.btnLink"
          class="font-medium sm:text-[16px] text-[10px] uppercase text-end text-white new_block"
        >
          {{ returnData?.banner?.btnText }}
        </NuxtLink>
      </div>
    </section>

    <!-- КОЛЕКЦІЯ 2024 -->
    <section class="sm:py-[90px] py-[35px] px-4 max-w-6xl mx-auto">
      <h2
        class="font-light sm:text-[36px] text-[16px] text-[#252525] sm:mb-[50px] mb-[30px]"
      >
        {{ returnData?.swiperItems?.Title }}
      </h2>

      <!-- Навигационные стрелки -->
      <div class="relative">
        <Swiper
          class="product-swiper"
          :modules="[SwiperNavigation, SwiperPagination]"
          :navigation="{
            prevEl: '.custom-prev',
            nextEl: '.custom-next',
          }"
          :pagination="{
            el: '.swiper-pagination',
            clickable: true,
          }"
          loop
          :spaceBetween="20"
          :breakpoints="{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }"
        >
          <SwiperSlide
            v-for="(product, index) in returnData?.swiperItems?.products"
            :key="index"
          >
            <ProductCard :data="product" />
          </SwiperSlide>
        </Swiper>

        <!-- Стрелки -->
        <div class="swiper-pagination sm:hidden" />
        <button
          class="custom-prev absolute ml:flex hidden top-1/2 left-[-25px] z-10 -translate-y-1/2"
        >
          <img src="/prev.svg" alt="prev" />
        </button>
        <button
          class="custom-next absolute ml:flex hidden top-1/2 right-[-25px] z-10 -translate-y-1/2"
        >
          <img src="/next.svg" alt="next" />
        </button>
      </div>

      <!-- Кнопка -->
      <div
        class="font-light max-w-[200px] mt-[70px] mx-auto w-full sm:text-[16px] text-[15px] uppercase text-center text-[#102840] border-[#102840] border-[0.5px] sm:py-4 py-[9px] px-0 mb-[20px]"
      >
        <NuxtLink
          to="/market"
          class="font-light w-full text-[16px] uppercase text-center text-[#102840] py-4 px-0 mb-[20px]"
          >Детальніше</NuxtLink
        >
      </div>
    </section>
    <section class="flex flex-wrap">
      <img
        v-for="(img, index) in returnData?.itemBlock?.image"
        :key="index"
        :src="`${img.url}`"
        alt="item"
        class="w-1/2 sm:h-[400px] h-[185px] object-cover"
      />
    </section>

    <!-- ПОДПИСКА -->
    <section class="bg-white sm:py-[90px] py-[35px] px-4 text-center">
      <h3
        class="font-light sm:text-[36px] text-[16px] text-center text-[#252525] mb-[50px]"
      >
        Дізнайтесь першим про новинки
      </h3>
      <form @submit.prevent="subscribe" class="max-w-[600px] mx-auto">
        <input
          type="email"
          v-model="email"
          placeholder="Ваш e-mail*"
          class="w-full py-4 border-[#252525]/100 border-[0.5px] text-center text-[16px] font-extralight mb-[10px] placeholder:text-[#252525]/50"
          required
        />
        <p v-if="emailError" class="text-red-500 text-sm mb-2">
          {{ emailError }}
        </p>
        <button
          class="font-light w-full text-[16px] uppercase text-center text-[#102840] border-[#102840] border-[0.5px] py-4 px-0 mb-[20px]"
        >
          ПІДПИСАТИСЯ
        </button>
        <p
          class="font-extralight sm:text-[16px] text-[13px] text-center text-[#252525]"
        >
          Натискаючи на кнопку «Підписатися», я погоджуюсь на обробку моїх
          персональних даних та ознайомлений з умовами конфіденційності.
        </p>
      </form>
    </section>
  </div>
</template>

<script setup>
import { homepage } from "~/queries/homepage";
const email = ref("");
const emailError = ref("");
const returnData = ref("");

const { data } = await useAsyncQuery(homepage);
returnData.value = data?.value?.homepage;
function subscribe() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.value) {
    emailError.value = "E-mail обов'язковий";
    return;
  } else if (!emailRegex.test(email.value)) {
    emailError.value = "Введіть коректний e-mail";
    return;
  }

  emailError.value = "";
  console.log("Email для підписки:", email.value);

  // Здесь можно отправить email на сервер
}
</script>
<style>
.new_block {
  margin-inline-end: -50px;
}
/* В style теге или глобально */
.swiper-pagination-bullet {
  background-color: #d9d9d9;
  opacity: 1;
  width: 8px;
  height: 8px;
}
.swiper-pagination {
  margin-block-end: -40px;
}
.swiper-pagination-bullet-active {
  background-color: #102840 !important;
}
</style>
