<template>
  <Layout>
    <section class="index-page">
      <section class="logo-container">
        <canvas />
        <herson-logo class="logo" />
      </section>
      <p class="center">
        <a
          target="_blank"
          href="https://news.herson.hn/"
        >RSS Reader</a>
      </p>
      <p class="center">
        <a
          target="_blank"
          href="https://lastfm.herson.hn/"
        >LastFM collage generator</a>
      </p>
    </section>
  </Layout>
</template>

<static-query>
  query {
    metadata {
      siteName, siteUrl
    }
  }
</static-query>

<script>
import HersonLogo from '@/assets/images/logo.svg';
import metadata from '@/mixins/metadata';

export default {
  meta: {
    title: 'Herson Salinas',
    description: 'Herson Salinas\' website',
  },
  mixins: [metadata],
  components: {
    HersonLogo,
  },
  async mounted() {
    // call setupEngine if the code was already loaded before
    // (this issue was happening only on dev mode)
    if (!window.setupEngine) {
      await import('@/scripts/home/monkeypatch');
      const { setupEngine } = await import('earthbound-battlebackgrounds');
      window.setupEngine = setupEngine;
    } else {
      window.setupEngine();
    }
  },
}
</script>

<style lang="scss">
.index-page {
  padding: 2rem;

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
