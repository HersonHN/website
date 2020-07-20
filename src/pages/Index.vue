<template>
  <Layout>
    <section class="index-page">
      <section class="logo-container">
        <canvas></canvas>
        <herson-logo class="logo"></herson-logo>
      </section>
      <p class="center"><a target="_blank" href="https://news.herson.hn/">RSS Reader</a></p>
    </section>
  </Layout>
</template>

<script>
  import HersonLogo from '@/assets/images/logo.svg';

  export default {
    metaInfo: {
      title: 'Home',
    },
    components: {
      HersonLogo,
    },
    async mounted() {
      await import('@/scripts/home/monkeypatch');
      await import('earthbound-battlebackgrounds');
    },
  }
</script>

<style lang="scss">
  .index-page {
    padding: 2rem;

    p {
      padding-bottom: 1rem;
    }

    .logo-container {
      $base-width: 450px;

      max-width: $base-width;
      display: block;
      margin: auto;
      position: relative;
      overflow: hidden;
      background-color: black;

      canvas, .logo {
        display: block;
        width: 100%;
      }

      canvas {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
      }

      .logo {
        transform: scale(1.1); // this removes the tiny line around
      }
    }
  }
</style>
