<template>
  <div class="terms-page max-w-[1440px] mx-auto px-4 pt-[90px] mb-[130px]">
    <Markdown :src="returnData" />
  </div>
</template>

<script setup>
import { privacyPolicy } from '~/queries/policy'

const returnData = ref('')

onMounted(async () => {
  const { data } = await useAsyncQuery(privacyPolicy)
  returnData.value = data?.value?.privacyPolicy?.text || ''
})
</script>


<style lang="scss">
.terms-page {
  font-family: var(--font-family);
  color: #000;

  h1 {
    font-weight: 500;
    font-size: 36px;
    color: #102840;
    margin-bottom: 24px;
  }

  h2 {
    font-weight: 500;
    font-size: 32px;
    color: #102840;
    margin-top: 32px;
    margin-bottom: 16px;
  }

  p {
    font-weight: 300;
    font-size: 24px;
    line-height: 162%;
    margin-bottom: 16px;
  }

  li {
    font-weight: 300;
    font-size: 24px;
    line-height: 150%;
    margin-bottom: 8px;
  }

  strong {
    font-weight: 500;
  }

  a {
    text-decoration: underline;
    text-decoration-skip-ink: none;
    color: inherit;

    &:hover {
      opacity: 0.8;
    }
  }

  // Медиа-запрос для экранов до 576px
  @media (max-width: 576px) {
    h1 {
      font-size: 16px;
    }

    h2 {
      font-size: 16px;
    }

    p,
    li,
    a {
      font-size: 14px;
    }
  }
}
</style>
