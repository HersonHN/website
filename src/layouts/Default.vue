<template>
  <section id="app">
    <page-header
      :page="page"
      :layout="layout"
      :force-theme="forceTheme"
    />
    <main>
      <slot />
    </main>
    <section>
      <slot name="post-content" />
    </section>
    <page-footer />
  </section>
</template>

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
    forceTheme: {
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

#app {
  display: flex;
  flex-flow: column nowrap;
  min-height: 100vh;

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
