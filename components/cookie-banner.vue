<template>
  <transition v-if="readyToShow && !cookieStore.accepted" name="fade">
    <div
      
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <div
        class="bg-white py-[50px] sm:px-[85px] px-[25px] max-w-[600px] w-full mx-4 text-[#252525] relative"
      >
        <button
          class="absolute top-5 right-5"
          @click="reject"
          aria-label="Закрити"
        >
          <img src="/x.svg" alt="Close" class="w-6 h-6" />
        </button>

        <h2 class="sm:text-[32px] text-[24px] text-center font-light sm:mb-[21px] mb-[12px]">Cookies</h2>
        <p class="sm:text-[20px] text-[16px] font-light leading-[160%] sm:mb-[27px] mb-[15px]">
          Сайт Jeesoir використовує файли cookies для забезпечення коректної роботи,
          зручності користування та аналітики відвідуваності.
        </p>

        <ul class="list-disc pl-5 sm:text-[16px] text-[14px] font-light leading-[160%] space-y-2 sm:mb-6 mb-[15px]">
          <li>зберігати вибрані вами налаштування (наприклад, мову або валюту);</li>
          <li>покращувати функціональність сайту;</li>
          <li>аналізувати взаємодію з контентом і вдосконалювати сервіс.</li>
        </ul>

        <p class="sm:text-[20px] text-[14px] font-light leading-[160%] sm:mb-8 mb-[15px]">
          Продовжуючи користування сайтом, ви погоджуєтеся на використання файлів cookies.
          За потреби ви можете змінити ці налаштування у своєму браузері.
        </p>

        <div class="flex flex-row gap-[17px] justify-center">
          <button
            class="w-full h-[73px] border border-[#102840] text-[16px] font-light leading-[160%] hover:bg-[#102840] hover:text-white active:bg-[#6d849a] active:text-white
"
            @click="reject"
          >
            Відхилити
          </button>
          <button
            class="w-full h-[73px] border border-[#102840] text-[16px] font-light leading-[160%] hover:bg-[#102840] hover:text-white active:bg-[#6d849a] active:text-white
"
            @click="accept"
          >
            Прийняти
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { useCookieStore } from '~/stores/cookie'

const cookieStore = useCookieStore()
const readyToShow = ref(false)

onMounted(() => {
  setTimeout(() => {
    cookieStore.load()
    readyToShow.value = true
  }, 2000)
})

const accept = () => {
  cookieStore.accept()
}

const reject = () => {
  cookieStore.accept() // Можно заменить на другое поведение
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
</style>
