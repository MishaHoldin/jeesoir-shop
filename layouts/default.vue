<!-- layouts/default.vue -->
<template>
  <div class="flex flex-col min-h-screen justify-between">
    <Header />
    <NuxtPage />
    <CookieBanner />
    <LoginModal v-if="isLoginOpen" @close="isLoginOpen = false" />

    <Footer />
  </div>
</template>

<script setup>
</script>
