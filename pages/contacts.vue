<template>
  <div
    class="min-h-screen bg-white flex items-center justify-center py-16 px-4"
  >
    <div class="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-[20px]">
      <!-- Left block -->
      <div class="p-10 border border-gray-300">
        <h1 class="text-3xl font-semibold text-gray-900 tracking-wide">
          JEE’SOIR
        </h1>
        <p class="mt-4 text-gray-800 leading-relaxed">
          <span class="font-bold">Ми завжди раді вам допомогти!</span> Якщо у
          вас є запитання, пропозиції чи потрібна консультація — звертайтесь до
          нас. Наша команда з радістю надасть вам підтримку та відповідь на всі
          ваші запити. Зв’яжіться з нами зручним для вас способом.
        </p>
      </div>

      <!-- Right block -->
      <div class="p-10 space-y-6 border border-gray-300">
        <h2 class="text-2xl font-medium text-gray-900">Контакти</h2>

        <div class="flex items-start space-x-4">
          <div class="text-blue-900 text-xl mt-1">
            <i class="fas fa-map-marker-alt"></i>
          </div>
          <div>
            <p class="font-medium">Електронна адреса</p>
            <a href="mailto:support@jeesoir.com" class="text-gray-600 underline"
              >support@jeesoir.com</a
            >
          </div>
        </div>

        <div class="flex items-start space-x-4">
          <div class="text-blue-900 text-xl mt-1">
            <i class="fas fa-phone-alt"></i>
          </div>
          <div>
            <p class="font-medium">Телефон:</p>
            <p class="text-gray-600">+380 (97) 697 11 31</p>
          </div>
        </div>

        <div class="flex items-start space-x-4">
          <div class="text-blue-900 text-xl mt-1">
            <i class="fas fa-calendar-alt"></i>
          </div>
          <div>
            <p class="font-medium">Графік роботи:</p>
            <p class="text-gray-600">Пн-Нд 9:00–20:00</p>
          </div>
        </div>

        <div>
          <p class="font-medium mb-2">Соц. мережі:</p>
          <div class="flex space-x-4 text-blue-900 text-2xl">
            <a href="#"><i class="fab fa-facebook-square"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// логика не требуется
</script>
