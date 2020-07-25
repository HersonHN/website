<template>
  <Layout
    :page="page"
    layout="post"
  >
    <section class="post content">
      <div class="title">
        <h1>{{ $page.post.title }}</h1>
        <div class="second-line">
          <small class="gray">{{ $page.post.date }}</small>
          <post-tag
            v-for="tag in $page.post.tags"
            :key="tag.id"
            :tag="tag"
          />
        </div>
      </div>

      <article v-html="$page.post.content" />
    </section>
  </Layout>
</template>

<page-query>
query Post ($id: ID!) {
  post(id: $id) {
    path, title, description, content
    fileInfo { name }
    date (format: "YYYY-MM-DD")
    tags (sortBy: "title ASC") { id, title }
  }
}
</page-query>

<static-query>
query {
  metadata {
    siteName, siteUrl, pathPrefix,
  }
}
</static-query>

<script>
  import PostTag from '@/components/post-tag.vue';

  export default {
    name: 'Post',
    metaInfo () {
      return {
        title: this.$page.post.title,
        meta: [
          { property: 'og:url', content: this.postURL, },
          { property: 'og:title', content: this.description, },
          { property: 'og:type', content: 'website', },
          { property: 'og:image', content: this.socialBanner, },
          { property: 'og:image:width', content: '1200', },
          { property: 'og:image:height', content: '675', },
          { property: 'og:site_name', content: this.siteName, },
          { property: 'og:locale', content: 'en_US', },
          { property: 'article:author', content: this.siteName, },
          { name: 'twitter:creator', content: '@hersonhn', },
          { name: 'twitter:url', content: this.postURL, },
          { name: 'twitter:title', content: this.description, },
          { name: 'twitter:image', content: this.socialBanner, },
        ],
      }
    },
    components: {
      PostTag,
    },
    computed: {
      page() {
        const props = {};
        props.banner = this.banner;
        return Object.assign(props, this.$page);
      },
      basePath() {
        return this.$static.metadata.siteUrl.replace(/\/$/, '');
      },
      banner() {
        return `${this.basePath}/content/banners/${this.slug}@banner.png`;
      },
      socialBanner() {
        return `${this.basePath}/content/banners/${this.slug}@social.png`;
      },
      slug() {
        return this.$page.post.fileInfo.name;
      },
      description() {
        return this.$page.post.description;
      },
      postURL() {
        return this.basePath + this.$page.post.path;
      },
      siteName() {
        return this.$static.metadata.siteName;
      },
    },
  }
</script>

<style lang="scss">
  .post.content {
    padding-bottom: 4rem;

    .title {
      margin-bottom: 2rem;

      h1 {
        margin-bottom: 0;
        font-size: 1.7rem;
      }

      .second-line {
        line-height: 2rem;
      }

      small {
        display: inline-block;
      }
    }

    article {
      > p, > ul, > ol {
        margin-bottom: 1.5rem;
      }
      h1, h2, h3 {
        margin-top: 4rem;
        margin-bottom: 2rem;
      }
    }
  }
</style>