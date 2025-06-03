<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
    <div class="relative w-[600px] bg-white px-8 py-10 text-center">
      <!-- Закрыть -->
      <button @click="$emit('close')" class="absolute top-4 right-4">
        <img src="/x.svg" alt="close" />
      </button>

      <!-- LOGIN -->
      <template v-if="step === 'login'">
        <h2 class="text-[20px] font-light text-[#252525] mb-8">Авторизація</h2>
        <input
          type="email"
          placeholder="Ваш e-mail*"
          class="input-style mb-4"
        />
        <div class="relative mb-4">
          <input
            :type="showPassword ? 'text' : 'password'"
            placeholder="Ваш пароль*"
            class="input-style"
          />
          <button
            @click="showPassword = !showPassword"
            class="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <img src="/eye.svg" alt="eye" />
          </button>
        </div>
        <div
          class="flex justify-between text-sm text-[#252525] mb-4 max-w-[400px] mx-auto"
        >
          <router-link to="/forgot-password" class="underline"
            >Забули пароль?</router-link
          >
          <button @click="step = 'register'" class="underline">
            Реєстрація
          </button>
        </div>
        <button class="btn-style mb-4">Увійти</button>
        <button
          class="btn-style flex items-center justify-center mx-auto gap-2"
        >
          <img src="/google.svg" alt="google" />
        </button>
      </template>

      <!-- REGISTER -->
      <template v-else-if="step === 'register'">
        <h2 class="text-[20px] font-light text-[#252525] mb-8">Реєстрація</h2>
        <input
          type="email"
          placeholder="Ваш e-mail*"
          class="input-style mb-4"
        />
        <div class="relative mb-4">
          <input
            :type="showPassword ? 'text' : 'password'"
            placeholder="Ваш пароль*"
            class="input-style"
          />
          <button
            @click="showPassword = !showPassword"
            class="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <img src="/eye.svg" alt="eye" />
          </button>
        </div>
        <button class="btn-style mb-4" @click="step = 'confirm'">
          Продовжити
        </button>
        <button
          class="btn-style flex items-center justify-center gap-2 mx-auto"
        >
          <img src="/google.svg" alt="google" />
        </button>
      </template>

      <!-- CONFIRM CODE -->
      <template v-else-if="step === 'confirm'">
        <h2 class="text-[20px] font-light text-[#252525] mb-4">Реєстрація</h2>
        <p class="text-sm text-[#252525] mb-6">
          Ми надіслали вам на пошту код для підтвердження реєстрації. Введіть
          його, будь ласка
        </p>
        <input type="text" placeholder="Код e-mail*" class="input-style mb-6" />
        <button class="btn-style" @click="step = 'success'">
          Зареєструватися
        </button>
      </template>

      <!-- SUCCESS -->
      <template v-else-if="step === 'success'">
        <h2 class="text-[20px] font-light text-[#252525] mb-4">
          Реєстрацію завершено!
        </h2>
        <p class="text-sm text-[#252525]">
          Дякуємо, що приєдналися до Jeesoir. Ви можете продовжити роботу з
          сайтом.
        </p>
      </template>
    </div>
  </div>
</template>

<script setup>
const step = ref("login"); // 'login', 'register', 'confirm', 'success'
const showPassword = ref(false);
</script>

<style scoped>
.input-style {
  @apply w-full max-w-[400px] h-[50px] border border-[#252525] border-[0.5px] px-4 text-[#252525] font-light text-[16px];
}
.btn-style {
  @apply w-full max-w-[400px] h-[50px] border border-[#102840] border-[0.5px] text-[#102840] text-[16px] font-light uppercase;
}
</style>
