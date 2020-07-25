
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
  metaInfo() {
    if (!this.$static) {
      console.error(
        'Please implement the GraphQL template:\n'
        + GRAPHQL_TEMPLATE
      )
    };

    const meta = getMetadata(this);
    const metaList = [
      { property: 'og:image:height', content: '675' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image', content: meta.socialBanner },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:site_name', content: meta.siteName },
      { property: 'og:title', content: meta.title },
      { property: 'og:description', content: meta.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: meta.fullPath },
      { name: 'twitter:creator', content: '@hersonhn' },
      { name: 'twitter:url', content: meta.fullPath },
      { name: 'twitter:image', content: meta.socialBanner },
      { name: 'twitter:title', content: meta.title },
      { name: 'twitter:description', content: meta.description },
    ];

    return {
      title: meta.title,
      meta: metaList,
      pageMeta: meta,
    };
  },

  computed: {
    page() {
      const props = {};
      props.meta = getMetadata(this);
      return Object.assign(props, this.$page);
    },
  }
};

function getMetadata(vm) {
  const siteName = getSiteName(vm);
  const basePath = getBasePath(vm);
  const title = getTitle(vm);
  const description = getDescription(vm);
  const banner = getBanner(vm) || 'default';

  const path = vm.$router.currentRoute.path;
  const fullPath = basePath + path;

  const socialBanner = `${basePath}/content/banners/${banner}@social.png`;
  const pageBanner = `${basePath}/content/banners/${banner}@banner.png`;

  return {
    siteName: siteName,
    basePath: basePath,
    banner: banner,
    pageBanner: pageBanner,
    socialBanner: socialBanner,
    fullPath: fullPath,
    path: path,
    title: title,
    description: description,
  }
}

function getMetaProp(vm, prop, required) {
  let meta = vm.$options.meta;

  if (typeof meta === 'function') {
    meta = vm.$options.meta.call(vm);
  }

  if (!meta) {
    console.error('Please set a `meta` object for the page component');
    return '';
  }

  if (meta[prop]) {
    return meta[prop];
  }

  if (required) {
    console.error(`Please set a [meta] object with a [${prop}] property for the page component`);
  } else {
    console.info(
      `To set a [${prop}], set a [meta] object with a [${prop}] property for the page component \n` +
      'Example: \n' + JSON.stringify({ meta: { banner: "default" } }, null, 2)
    );
  }
  return '';
}

function getSiteName(vm) {
  if (!vm.$static) return '';
  if (!vm.$static.metadata) return '';
  if (!vm.$static.metadata.siteName) return '';

  return vm.$static.metadata.siteName;
}

function getBasePath(vm) {
  if (!vm.$static) return '';
  if (!vm.$static.metadata) return '';
  if (!vm.$static.metadata.siteUrl) return '';

  return vm.$static.metadata.siteUrl.replace(/\/$/, '');
}

function getTitle(vm) {
  return getMetaProp(vm, 'title', true);
}

function getDescription(vm) {
  return getMetaProp(vm, 'description', true);
}

function getBanner(vm) {
  return getMetaProp(vm, 'banner', false);
}

