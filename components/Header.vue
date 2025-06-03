<template>
  <header class="w-full border-b border-gray-200 bg-white relative z-50">
    <div
      class="max-w-[1440px] mx-auto px-4 pt-[14px] pb-[20px] flex justify-between items-center"
    >
      <!-- Бургер -->
      <button  @click="toggleMenu">
        <img src="/burger.svg" alt="Menu" width="24" />
      </button>

      <!-- Логотип -->
      <router-link to="/">
        <img class="w-full sm:max-w-[161px] max-w-[88px] h-auto" alt="logo" src="/logo.svg" />
      </router-link>

      <!-- Иконки -->
      <div class="flex items-center sm:gap-[30px] gap-[10px]">
        <router-link to="/">
          <img alt="search" src="/search.svg" class="sm:w-6 sm:h-6 w-3 h-3" />
        </router-link>
        <router-link to="/">
          <img alt="profile" src="/profile.svg" class="sm:w-6 sm:h-6 w-3 h-3" />
        </router-link>
        <router-link to="/">
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
            class="text-[#252525]"
            @click="closeMenu"
          >Головна</router-link>

          <router-link to="/market" class="text-[#797979] hover:text-[#252525]" @click="closeMenu">Каталог</router-link>

          <!-- Разделитель -->
          <hr class="my-4 w-[95px] h-[1px] bg-[#797979] border-none" />

          <router-link to="/cart" class="text-[#797979] hover:text-[#252525]" @click="closeMenu">Кошик</router-link>
          <router-link to="" class="text-[#797979] hover:text-[#252525]" @click="closeMenu">Обране</router-link>
          <router-link to="" class="text-[#797979] hover:text-[#252525]" @click="closeMenu">Замовлення</router-link>
          <router-link to="/return" class="text-[#797979] hover:text-[#252525]" @click="closeMenu">Повернення</router-link>
          <router-link to="" class="text-[#797979] hover:text-[#252525]" @click="closeMenu">Про нас</router-link>
        </nav>
      </aside>
    </transition>

    <LoginModal v-if="loginModalOpen" @close="loginModalOpen = false" />

  </header>
</template>

<script setup>
const menuOpen = ref(false);

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function closeMenu() {
  menuOpen.value = false;
}

const loginModalOpen = ref(false)


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
