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
import metadata from '@/mixins/metadata';
import PostTag from '@/components/post-tag.vue';

export default {
  name: 'Post',
  mixins: [metadata],
  meta() {
    return {
      banner: this.$page.post.fileInfo.name,
      title: this.$page.post.title,
      description: this.$page.post.description,
      date: this.$page.post.date,
    };
  },
  components: {
    PostTag,
  }
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