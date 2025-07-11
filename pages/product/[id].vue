<template>
  <div class="bg-white max-w-[1440px] w-full mx-auto px-4 py-12 text-[#252525]">
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- ГАЛЕРЕЯ -->
      <div class="sm:flex grid grid-cols-2 justify-between gap-[20px]">
        <div class="flex sm:flex-col flex-col-reverse lg:flex-row gap-4 w-full">
          <!-- Превью -->
          <div class="flex lg:flex-col gap-2 w-full max-w-[80px] shrink-0">
            <img
              v-for="(img, index) in product?.images"
              :key="index"
              :src="`${img.url}`"
              class="cursor-pointer max-w-[100px] max-h-[100px] object-cover w-full h-auto"
              @click="openModal(index)"
            />
          </div>
          <!-- Основное изображение -->
          <div class="flex-1 flex  items-start">
            <img
              :src="`${product?.images?.[activeImage]?.url}`"
              @click="openModal(0)"
              class="
              sm:max-w-[448px]  min-w-[160px] sm:max-h-[541px] h-auto min-h-[240px] 
              w-full object-cover cursor-pointer"
              alt="product"
            />
          </div>
        </div>
        <div class="sm:hidden flex flex-col min-w-[120px]">
          <h1
            class="font-light sm:hidden flex text-[20px] text-start text-[#252525] sm:mb-5 mb-[12px]"
          >
            {{ product?.Name }}
          </h1>
          <div class="font-bold sm:hidden flex text-[16px] text-[#252525] mb-4">
            {{ product?.price }} €
          </div>
          <div
            class="sm:hidden flex flex-col sm:gap-[16px] gap-[10px] sm:mb-[30px] mb-[15px]"
          >
            <div
              class="w-[32px] h-[32px] rounded-full border border-[#252525] flex flex-col items-center justify-center"
            >
              <div
                class="w-[24px] h-[24px] rounded-full"
                :style="{ backgroundColor: product?.color.color }"
              ></div>
            </div>
            <div class="font-light text-[14px] text-[#252525]">
              Колір: {{ product?.color.Name || "Синій" }}
            </div>
          </div>

          <!-- Размеры -->
          <div class="mb-[34px] sm:hidden block">
            <button
              @click="sizeChartOpen = true"
              class="font-extralight text-[20px] underline decoration-[#252525] decoration-1 underline-offset-0 text-[#252525] sm:mb-[22px] mb-[8px]"
            >
              Розмірна сітка
            </button>

            <div class="flex gap-2 flex-wrap">
              <button
              v-for="size in sortedSizes"
              :key="size.Name"
              @click="selectedSize = size.Name"
              :class="[ selectedSize === size.Name ? 'bg-black text-white border-black' : 'bg-[#d9d9d9] text-[#4d4d4d] hover:bg-gray-100', 'px-4 py-2 text-sm font-[300] text-center border']"
            >
                {{ size.Name }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ИНФОРМАЦИЯ -->
      <div class="">
        <h1
          class="font-light sm:flex hidden text-[20px] text-start text-[#252525] mb-5"
        >
          {{ product?.Name }}
        </h1>
        <div class="font-bold sm:flex hidden text-[16px] text-[#252525] mb-4">
          {{ product?.price }} €
        </div>
        <div class="sm:flex hidden flex-col gap-[16px] mb-[30px]">
          <div
            class="w-[32px] h-[32px] rounded-full  flex flex-col items-center justify-center"
          >
            <div
              class="w-[24px] h-[24px] rounded-full"
              :style="{ backgroundColor: product?.color.color }"
            ></div>
          </div>
          <div class="font-light text-[14px] text-[#252525]">
            Колір: {{ product?.color.Name || "Синій" }}
          </div>
        </div>

        <!-- Размеры -->
        <div class="mb-[34px] sm:block hidden">
          <button
            @click="sizeChartOpen = true"
            class="font-extralight text-[20px]  decoration-[#252525] decoration-1 text-[#252525] mb-[22px]"
          >
            Розмірна сітка
          </button>
          <div class="flex gap-2">
            <button
              v-for="size in sortedSizes"
              :key="size.Name"
              @click="selectedSize = size.Name"
              :class="[
                'px-4 py-2 text-sm font-[300] text-center border hover:bg-[#102840] hover:text-white',
                selectedSize === size.Name
                  ? 'bg-[#102840] text-white border-black'
                  : 'bg-[#d9d9d9] text-[#4d4d4d] ',
              ]"
            >
              {{ size.Name }}
            </button>
          </div>
        </div>

        <!-- Кнопки -->
        <div class="flex sm:flex-row flex-col gap-5 mb-[45px]">
          <button
            @click="handleAddToCart()"
            class="border border-[#102840] border-[0.5px] px-[81px] pt-[16px] pb-[17px] font-light text-[16px] uppercase text-center text-[#102840] w-full hover:bg-[#102840] hover:text-white active:bg-[#6d849a] active:text-white"
          >
            У КОШИК
          </button>
          <button
            class="border border-[#102840] border-[0.5px] px-[81px] pt-[16px] pb-[17px] font-light text-[16px] uppercase text-center text-[#102840] w-full hover:bg-[#102840] hover:text-white active:bg-[#6d849a] active:text-white"
          >
            В ОБРАНЕ
          </button>
        </div>
        <router-link
          to="/market"
          class="font-light text-base underline [text-decoration-skip-ink:none] text-center text-[#252525] my-[30px] block sm:hidden"
          >Повернутися до каталогу
        </router-link>
        <!-- Подробиці -->
        <div>
          <h2 class="font-light text-[16px] text-[#252525]">Подробиці</h2>
          <details
            v-for="(item, index) in items"
            :key="index"
            class="border-b border-[#252525]/30 group appearance-none marker:hidden"
          >
            <summary
              class="flex justify-between items-center  pt-5 pb-[10px] font-light text-[16px] text-[#252525] font-sans list-none marker:hidden cursor-pointer"
            >
              {{ item.title }}
              <span
                class="transform transition-transform duration-300 group-open:rotate-180"
              >
                <svg
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 10.7406L12.8891 6.85156L14 7.9625L9 12.9625L4 7.9625L5.11094 6.85156L9 10.7406Z"
                    fill="#102840"
                  />
                </svg>
              </span>
            </summary>
            <div
              class="pb-6 pt-1 px-0 text-[14px] leading-[150%] font-extralight text-[#252525] font-sans"
            >
              <p class="whitespace-pre-line">{{ item.content }}</p>
            </div>
          </details>
        </div>
      </div>
      <router-link
        to="/market"
        class="sm:block mt-6 font-light text-[24px] underline text-[#252525] hidden font-raleway"
        >Повернутися до каталогу</router-link
      >

      <!-- Галерея-модалка -->
      <div
        v-if="isModalOpen"
        class="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
      >


        <div class="relative w-full max-w-3xl px-4">
          <button
          class="absolute top-0 right-[6%] text-black text-3xl"
          @click="closeModal"
        >
          ×
        </button>
          <img
            :src="`${product?.images?.[modalImageIndex]?.url}`"
            class="w-full h-auto object-contain max-h-[80vh] mx-auto"
          />

          <button
            @click="prevImage"
            class="absolute left-0 top-1/2 transform -translate-y-1/2 px-4 text-white text-3xl"
          >
          <svg width="61" height="61" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse opacity="0.1" cx="29.8762" cy="29.9763" rx="29.8762" ry="29.9763" transform="matrix(-1 0 0 1 60.6523 0.523438)" fill="#102840" />
            <path d="M35.1765 20.0273L24.7401 30.4997L35.1765 40.9715" stroke="white" stroke-width="2" />
          </svg>
          </button>
          <button
            @click="nextImage"
            class="absolute right-0 top-1/2 transform -translate-y-1/2 px-4 text-white text-3xl"
          >
          <svg width="61" height="61" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse opacity="0.1" cx="29.8762" cy="29.9763" rx="29.8762" ry="29.9763" transform="matrix(1 1.75431e-07 1.74262e-07 -1 0.398438 60.4756)" fill="#102840" />
            <path d="M25.8735 40.9707L36.3099 30.4984L25.8735 20.0266" stroke="white" stroke-width="2" />
          </svg>
          </button>
        </div>
      </div>
    </div>
    <!-- <section
      class="sm:py-[130px] py-[35px] px-4 max-w-[1440px] mx-auto"
      v-show="product?.same_product"
    >
      <h2 class="font-[300] text-[20px] pb-[50px] text-start text-[#252525]">
        Вам може сподобатися
      </h2>


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
            v-for="(product, index) in product?.same_product"
            :key="index"
          >
            <ProductCard :data="product" />
          </SwiperSlide>
          <div class="swiper-pagination sm:hidden mt-10" />
        </Swiper>
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
    </section> -->

    <transition name="slide">
      <aside
        v-if="sizeChartOpen"
        class="fixed top-0 right-0 w-[80%] h-full bg-white z-50 shadow-lg overflow-auto"
      >
        <!-- Верхняя панель -->
        <div
          class="flex items-center gap-[10px] px-6 py-4 border-b border-[#ccc]"
        >
          <button
            @click="sizeChartOpen = false"
            class="text-[24px] text-[#252525]"
          >
            <svg
              width="14"
              height="24"
              viewBox="0 0 14 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.03046 11.9981L13.7793 20.7469L11.2801 23.2461L0.0321302 11.9981L11.2801 0.750084L13.7793 3.24925L5.03046 11.9981Z"
                fill="#102840"
              />
            </svg>
          </button>
          <h2 class="font-[300] text-[36px] text-black">Розмірна сітка</h2>
          <div class="w-6 h-6"></div>
          <!-- пустота для выравнивания -->
        </div>

        <!-- Таблица -->
        <div class="p-6 overflow-x-auto">
          <NuxtImg provider="strapi" :src="product?.sizeTable?.url" alt="" />
        </div>
      </aside>
    </transition>
  </div>
</template>

<script setup>
import { getProduct } from "~/queries/market";

const route = useRoute();
const id = route.params.id;
const selectedSize = ref(null);

const { data } = await useAsyncQuery(getProduct, {
  documentId: id,
});
const sizeChartOpen = ref(false);
const product = computed(() => data.value?.product || null);
const activeImage = ref(0);
const items = computed(() => [
  {
    title: "Опис",
    content: product.value?.description || "",
  },
  {
    title: "Склад та догляд",
    content: product.value?.material || "",
  },
]);
const isModalOpen = ref(false);
const modalImageIndex = ref(0);

const openModal = (index) => {
  modalImageIndex.value = index;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const nextImage = () => {
  if (product.value?.images?.length) {
    modalImageIndex.value =
      (modalImageIndex.value + 1) % product.value.images.length;
  }
};

const prevImage = () => {
  if (product.value?.images?.length) {
    modalImageIndex.value =
      (modalImageIndex.value - 1 + product.value.images.length) %
      product.value.images.length;
  }
};
import { useCartStore } from "~/stores/cart";

const cart = useCartStore();

function handleAddToCart() {
  cart.addToCart({
    id: product.value.documentId,
    name: product.value.Name,
    price: product.value.price,
    image: product.value.images[0].url,
    color: product.value.color,
    size: selectedSize.value,
    productNumber: product.value.productNumber,
  });
  window.location.href = "/cart";
}

const sizeOrder = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'];

const sortedSizes = computed(() => {
  const sizes = product.value?.sizes;
  if (!sizes) return [];
  return [...sizes].sort((a, b) => {
    const aIndex = sizeOrder.indexOf(a.Name.toUpperCase());
    const bIndex = sizeOrder.indexOf(b.Name.toUpperCase());
    return (aIndex === -1 ? Infinity : aIndex) - (bIndex === -1 ? Infinity : bIndex);
  });
});



</script>
