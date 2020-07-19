<template>
  <section id="global-content"
    :class="[page.forceTheme ? `${page.forceTheme}-theme` : '']"
  >
    <page-header></page-header>
    <main>
      <slot></slot>
    </main>
    <section class="post-content">
      <!-- post-content -->
    </section>
    <page-footer></page-footer>
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

#global-content {
  display: flex;
  flex-flow: column nowrap;
  min-height: 100%;

  .content {
    max-width: 80ch;
    margin: auto;
    padding: 1rem;
  }
}

#global-content > main {
  flex: 1 1;
}
</style>
