<template>
  <Layout>
    <section class="post content">
      <div class="title">
        <h1>{{ $page.post.title }}</h1>
        <div class="second-line">
          <small class="gray">{{ $page.post.date }}</small>
            <post-tag v-for="tag in $page.post.tags" :key="tag.id" :tag="tag"></post-tag>
        </div>
      </div>

      <article v-html="$page.post.content">
      </article>
    </section>
  </Layout>
</template>

<page-query>
query Post ($id: ID!) {
  post(id: $id) {
    path
    title
    description
    date (format: "YYYY-MM-DD")
    tags {
      id
      title
    }
    content
  }
}
</page-query>

<script>
  import PostTag from '@/components/post-tag.vue';

  export default {
    name: 'Post',
    metaInfo () {
      return {
        title: this.$page.post.title,
        hasCode: this.$page.post.content.indexOf('<pre>') > -1,
      }
    },
    components: {
      PostTag,
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