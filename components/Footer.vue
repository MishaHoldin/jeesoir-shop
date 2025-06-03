<template>
  <footer class="bg-[#f5f5f5] py-10 text-[#797979]">
    <div
      class="max-w-[820px] mx-auto px-4 text-[20px] font-light leading-[125%]"
    >
      <!-- Грид для мобильного: 2x2, на десктопе — flex -->
      <div
        class="grid grid-cols-2 gap-y-6 text-center md:flex md:justify-between md:text-left justify-between"
      >
        <!-- 1. Левая часть -->
        <div
          class="flex flex-col sm:gap-[34px] sm:items-center items-center sm:text-[20px] text-[10px] gap-[10px]"
        >
          <router-link to="/privacy-policy"
            >Політика конфіденційності</router-link
          >
          <router-link to="/terms">Умови користування</router-link>
        </div>

        <!-- 2. Центр -->
        <div
          class="flex flex-col sm:gap-[34px] sm:items-center items-center sm:text-[20px] text-[10px] gap-[10px]"
        >
          <span>© Jeesoir 2025</span>
          <span>Усі права захищені</span>
        </div>

        <!-- 3. Email -->
        <div
          class="flex flex-col items-center sm:gap-[34px] col-span-2 md:col-span-1 sm:text-[20px] text-[10px]"
        >
          <a
            href="mailto:support@jeesoir.com"
            class="underline decoration-transparent hover:decoration-inherit"
          >
            support@jeesoir.com
          </a>
          <!-- 4. Иконки -->
          <div
            class="flex gap-4 justify-center md:justify-start items-center col-span-2 md:col-span-1"
          >
            <img src="/fb.svg" alt="Facebook" class="w-6 h-6" />
            <img src="/inst.svg" alt="Instagram" class="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup></script>
