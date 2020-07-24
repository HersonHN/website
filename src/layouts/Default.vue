<template>
  <section
    id="app"
    :class="[page.forceTheme ? `${page.forceTheme}-theme` : '']"
  >
    <page-header :page="page" :layout="layout" />
    <main>
      <slot />
    </main>
    <section>
      <slot name="post-content" />
    </section>
    <page-footer />
  </section>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
  import PageHeader from '@/components/page-header';
  import PageFooter from '@/components/page-footer';

  export default {
    props: {
      page: {
        type: Object,
        required: false,
        default() { return {}; },
      },
      layout: {
        type: String,
        required: false,
        default: '',
      },
    },
    components: {
      PageHeader,
      PageFooter,
    },
  };
</script>

<style lang="scss">
  body {
    text-rendering: optimizeLegibility;
    height: 100%;
    font-family: sans-serif;
  }

  #app {
    display: flex;
    flex-flow: column nowrap;
    min-height: 100%;

    .content {
      max-width: 80ch;
      margin: auto;
      padding: 1rem;
    }
  }

  #app > main {
    flex: 1 1;
  }
</style>
