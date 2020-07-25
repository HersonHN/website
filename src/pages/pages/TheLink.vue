<template>
  <Layout>
    <section class="content mono">
      <h1>{{ page.meta.title }}</h1>
      <p>
        There's a certain torrent site, that has a very annoying feature.
        When you want to click the <strong>Magnet</strong> or <strong>Download Torrent</strong>
        button, the site redirects you to another webpage with a lot of ads and you have to
        click next like 10 times to get to the real link.
      </p>
      <p>
        With this you only need to right-click the torrent link and paste it here, the gray
        text area below will show you the real magnet link.
      </p>

      <p>
        <label for="input">URL:</label>
        <input
          id="input"
          v-model="url"
          @change="transformURL()"
        >
        <button @click="pasteURL()">
          Paste
        </button>
      </p>
      <p>
        <textarea
          rows="7"
          readonly
          v-model="decodedURL"
          ref="output"
        />
      </p>
      <p class="right">
        <button @click="openURL()">
          Open URL
        </button>
        <button @click="copyURL()">
          Copy
        </button>
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
import metadata from '@/components/metadata';

export default {
  name: 'TheLink',
  mixins: [metadata],

  meta: {
    title: 'The Link Page',
    description: 'Remove paywalls from Torrent links',
  },

  data() {
    return {
      url: '',
      decodedURL: '',
    }
  },

  methods: {
    async pasteURL() {
      this.url = await navigator.clipboard.readText();
      this.transformURL();
    },

    transformURL() {
      let origin = this.url;
      let [_, encoded] = origin.split('?url=');
      if (!encoded) return;

      let decoded = decodeURIComponent(encoded);
      this.decodedURL = decoded;
    },

    copyURL() {
      this.$refs.output.select();
      document.execCommand('copy');
    },

    openURL() {
      if (!this.decodedURL) return;
      window.open(this.decodedURL);
    },
  }
};
</script>

<style>
#url { width: 200px; }
textarea { background: rgba(50%, 50%, 50%, 0.2); }
</style>
