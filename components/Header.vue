<template>
  <header
    :class="[
      'w-full z-50 transition-all duration-300 border-b',
      isSticky ? 'fixed top-0 bg-white shadow-md' : 'relative bg-white'
    ]"
  >

  

    <div
      class="max-w-[1440px] mx-auto px-4 pt-[14px] pb-[20px] flex justify-between items-center"
    >
      <!-- Бургер -->
      <button  @click="toggleMenu">
        <img src="/burger.svg" alt="Menu" width="24" />
      </button>

      <!-- Логотип -->
      <router-link to="/" class="flex">
        <img class="w-full sm:max-w-[161px] max-w-[88px] h-auto sm:ml-[100%]" alt="logo" src="/logo.svg" />
      </router-link>

      <transition name="fade">
        <div v-if="showSearch" class="absolute top-0 left-0 w-full bg-white z-40 border-b border-gray-200">
          <div class="max-w-[1440px] mx-auto px-4 h-[72px] flex items-center justify-between">
            <!-- Бургер -->
            <button @click="toggleMenu">
              <img src="/burger.svg" alt="Menu" width="24" />
            </button>
      
            <!-- Поисковая форма -->
            
            <!-- Иконки -->
            <div class="flex w-full items-center justify-end gap-4">
              <div class="relative flex-grow max-w-[700px] sm:mx-4 sm:ml-0 ml-[10px]">
                <div class="flex border border-gray-300 rounded-t-md overflow-hidden">
                  <div class="sm:flex hidden items-center px-3">
                    <img src="/search.svg" alt="search" class="w-4 h-4" />
                  </div>
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Пошук..."
                    class="flex-grow py-2 px-2 font-light text-[18px] text-[#252525] outline-none w-full"
                  />
                  <button class="bg-[#102840] font-light text-[18px] text-white px-4 py-2 sm:max-w-[120px] max-w-[90px] w-full sm:flex hidden">
                    Пошук
                  </button>
                  <button @click="toggleSearchBar" class="font-light text-[18px] text-[#000] max-w-[40px] px-4 py-2  w-full">
                    Х
                  </button>
                </div>
              
                <!-- Выпадающий список -->
                <ul
                  v-if="searchResults.length && searchQuery"
                  class="absolute left-0 right-0 top-full border-x border-b border-gray-300 bg-white z-50 rounded-b-md shadow-md max-h-[300px] overflow-y-auto"
                >
                  <li
                    v-for="item in searchResults"
                    :key="item.documentId"
                    class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#252525]"
                    @click="goToProduct(item.documentId)"
                  >
                    {{ item.Name }}
                  </li>
                </ul>
              </div>
              
              <img alt="profile" src="/profile.svg" class="w-5 h-5" />
              <img alt="heart" src="/heart.svg" class="w-5 h-5" />
              <router-link to="/cart">
                <img alt="cart" src="/cart.svg" class="w-5 h-5" />
              </router-link>
            </div>
          </div>
        </div>
      </transition>
      


<!-- Иконки -->
<div class="flex items-center sm:gap-[30px] gap-[10px]">
        <div class="relative ml-[80px]">
          <button
            @click="toggleCurrencyDropdown"
            class="flex items-center gap-1 font-light text-[18px] text-[#252525] pb-[2px]"
          >
            {{ currencyStore.selectedCurrency }}
            <img
              src="/arrow-down.svg"
              alt="dropdown"
              class="w-3 h-3 transition-transform duration-300"
              :class="{ 'rotate-180': showCurrencyDropdown }"
            />
          </button>
        
          <ul
            v-if="showCurrencyDropdown"
            class="absolute left-0 bg-white shadow border mt-2 w-16 z-50"
          >
            <li
              v-for="curr in currencies.filter(c => c !== currencyStore.selectedCurrency)"
              :key="curr"
              @click="selectCurrency(curr)"
              class="px-2 py-1 cursor-pointer text-center font-light text-[18px] text-[#252525] border-b border-[#102840]"
            >
              {{ curr }}
            </li>
          </ul>
        </div>
        
        
        <button @click="toggleSearchBar">
          <img alt="search" src="/search.svg" class="sm:w-6 sm:h-6 w-3 h-3" />
        </button>
        <router-link to="/">
          <img alt="profile" src="/profile.svg" class="sm:w-6 sm:h-6 w-3 h-3" />
        </router-link>
        <router-link to="/wishlist">
          <img alt="heart" src="/heart.svg" class="sm:w-6 sm:h-6 w-3 h-3" />
        </router-link>
        <router-link to="/cart">
          <img alt="cart" src="/cart.svg" class="sm:w-6 sm:h-6 w-3 h-3" />
        </router-link>
        
      </div>
    </div>

    <!-- Overlay -->
    <transition name="fade">
      <div v-if="menuOpen" class="fixed inset-0 z-40 bg-black/30" @click="closeMenu" />
    </transition>

    <!-- Slide-out Menu -->
    <transition name="slide">
      <aside
        v-if="menuOpen"
        class="fixed top-0 left-0 sm:w-[20%] w-[50%] max-w-full h-full bg-white p-6 z-50 overflow-y-auto flex flex-col "
      >
        <!-- Кнопка закрытия -->
        <button class="mb-6 justify-end flex" @click="closeMenu">
          <img src="/close.svg" alt="Закрити" width="24" />
        </button>

        <!-- Вход / регистрация -->
        <div class="sm:text-[20px] text-[16px] font-light text-[#252525] sm:mb-8 mb-[30px] cursor-pointer" @click="loginModalOpen = true">
          Вхід | Реєстрація
        </div>

        <!-- Меню -->
        <nav class="flex flex-col gap-3 sm:text-[24px] text-[16px] font-light leading-none">
          <!-- Текущая страница выделена чёрным -->
          <router-link
          to="/"
          :class="route.path === '/' ? 'text-[#252525]' : 'text-[#797979] hover:text-[#252525]'"
          @click="closeMenu"
        >Головна</router-link>
        
        <router-link
          to="/market"
          :class="route.path.startsWith('/market') ? 'text-[#252525]' : 'text-[#797979] hover:text-[#252525]'"
          @click="closeMenu"
        >Каталог</router-link>
        

        

          <!-- Разделитель -->
          <hr class="my-4 w-[95px] h-[1px] bg-[#797979] border-none" />

          <router-link
          to="/cart"
          :class="route.path === '/cart' ? 'text-[#252525]' : 'text-[#797979] hover:text-[#252525]'"
          @click="closeMenu"
        >Кошик</router-link>
          <router-link
          to="/wishlist"
          :class="route.path === '/wishlist' ? 'text-[#252525]' : 'text-[#797979] hover:text-[#252525]'"
          @click="closeMenu"
        >Обране</router-link>

          <router-link to="/" class="text-[#797979] hover:text-[#252525]" @click="closeMenu">Замовлення</router-link>
          <router-link
            to="/return"
            :class="route.path === '/return' ? 'text-[#252525]' : 'text-[#797979] hover:text-[#252525]'"
            @click="closeMenu"
          >
            Повернення
          </router-link>

          <router-link to="/" class="text-[#797979] hover:text-[#252525]" @click="closeMenu">Про нас</router-link>
        </nav>
      </aside>
    </transition>

    <LoginModal v-if="loginModalOpen" @close="loginModalOpen = false" />

  </header>
</template>

<script setup>
import { searchProducts } from '@/queries/market';
const menuOpen = ref(false);
const currencyStore = useCurrencyStore()
const showCurrencyDropdown = ref(false)
const loginModalOpen = ref(false)
const showSearch = ref(false)
const searchQuery = ref('')
const currencies = ['UAH', 'USD', 'EUR']
const route = useRoute();

function toggleCurrencyDropdown() {
  showCurrencyDropdown.value = !showCurrencyDropdown.value
}
const isSticky = ref(false);

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

function handleScroll() {
  isSticky.value = window.scrollY > 100; // изменить значение по желанию
}

function selectCurrency(curr) {
  currencyStore.setCurrency(curr)
  showCurrencyDropdown.value = false
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function closeMenu() {
  menuOpen.value = false;
}



function toggleSearchBar() {
  showSearch.value = !showSearch.value
}

const searchResults = ref([]);
const loadingSearch = ref(false);
const router = useRouter();

watch(searchQuery, async (newQuery) => {
  if (!newQuery || newQuery.length < 2) {
    searchResults.value = [];
    return;
  }

  loadingSearch.value = true;
  try {
    const { onResult } = useQuery(searchProducts, { name: newQuery });
    onResult((res) => {
      searchResults.value = res.data?.products || [];
      loadingSearch.value = false;
    });
  } catch (e) {
    console.error('Search error', e);
    loadingSearch.value = false;
  }
});

function goToProduct(documentId) {
  router.push(`/product/${documentId}`);
  showSearch.value = false;
  searchQuery.value = '';
  searchResults.value = [];
}

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  transform: translateX(-100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
