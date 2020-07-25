
/* GraphQL template:
 * =================
*/

const GRAPHQL_TEMPLATE = `
<static-query>
  query {
    metadata {
      siteName, siteUrl
    }
  }
</static-query>
`;

export default {
  metaInfo () {
    if (!this.$static) {
      console.error(
        'Please implement the GraphQL template:\n'
        + GRAPHQL_TEMPLATE
      )
    };

    const metadata = [
      { property: 'og:image:height', content: '675' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image', content: this.socialBanner },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:site_name', content: this.siteName },
      { property: 'og:title', content: this.title },
      { property: 'og:description', content: this.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: this.fullPath },
      { name: 'twitter:creator', content: '@hersonhn' },
      { name: 'twitter:url', content: this.fullPath },
      { name: 'twitter:image', content: this.socialBanner },
      { name: 'twitter:title', content: this.title },
      { name: 'twitter:description', content: this.description },
    ];

    return {
      title: this.title,
      meta: metadata,
    }
  },

  computed: {
    page() {
      const props = {};
      props.banner = this.banner;
      return Object.assign(props, this.$page);
    },
    siteName() {
      if (!this.$static) return '';
      if (!this.$static.metadata) return '';
      if (!this.$static.metadata.siteName) return '';

      return this.$static.metadata.siteName;
    },
    basePath() {
      if (!this.$static) return '';
      if (!this.$static.metadata) return '';
      if (!this.$static.metadata.siteUrl) return '';

      return this.$static.metadata.siteUrl.replace(/\/$/, '');
    },
    banner() {
      return `${this.basePath}/content/banners/${this.slug}@banner.png`;
    },
    socialBanner() {
      return `${this.basePath}/content/banners/${this.slug}@social.png`;
    },
    fullPath() {
      return this.basePath + this.path;
    },

    // Default values to be overwritten
    slug() {
      return 'default';
    },
    title() {
      return this.siteName;
    },
    description() {
      console.error('Please set a `description` property for the component');
      return '';
    },
    path() {
      console.error('Please set a `path` property for the component');
      return '';
    },
  }
}