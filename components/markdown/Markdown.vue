<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import MarkdownIt from 'markdown-it'

const props = defineProps<{
  src: string
  class?: string
}>()

const markdownContent = ref<HTMLElement>()

const markdown = MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
})

// Кастомные правила
markdown.renderer.rules.heading_open = (tokens, idx) => {
  const tag = tokens[idx].tag
  return `<${tag} class="markdown-heading-${tag}">`
}

markdown.renderer.rules.paragraph_open = () => `<p class="markdown-paragraph">`
markdown.renderer.rules.bullet_list_open = () => `<ul class="markdown-list">`
markdown.renderer.rules.ordered_list_open = () => `<ol class="markdown-ordered-list">`
markdown.renderer.rules.list_item_open = () => `<li class="markdown-list-item">`
markdown.renderer.rules.blockquote_open = () => `<blockquote class="markdown-blockquote">`
markdown.renderer.rules.code_inline = (tokens, idx) => `<code class="markdown-inline-code">${tokens[idx].content}</code>`
markdown.renderer.rules.code_block = (tokens, idx) => `<pre class="markdown-code-block"><code>${tokens[idx].content}</code></pre>`

const renderMarkdown = () => {
  if (markdownContent.value && props.src) {
    markdownContent.value.innerHTML = markdown.render(props.src)
  }
}

// Поддержка реактивности
watch(() => props.src, renderMarkdown)

onMounted(renderMarkdown)
</script>

<template>
  <div  ref="markdownContent" :class="class" />
</template>

<style lang="scss" scoped>
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
}
</style>
