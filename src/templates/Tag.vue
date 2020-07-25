<template>
  <Layout>
    <post-list
      :title="page.meta.title"
      :posts="posts"
    />
    <template v-slot:post-content>
      <all-tags />
    </template>
  </Layout>
</template>

<page-query>
  query Tag ($id: ID!) {
    tag(id: $id) {
      title, path
      belongsTo(page: 1, perPage: 100) @paginate {
        pageInfo { totalPages, currentPage }
        posts: edges {
          meta: node {
            ... on Post {
              id, path, title, description
              date (format: "YYYY-MM-DD")
            }
          }
        }
      }
    }
  }
</page-query>

<static-query>
  query {
    metadata {
      siteName, siteUrl
    }
  }
</static-query>

<script>
import metadata from '@/components/metadata';

import PostList from '@/components/post-list.vue';
import AllTags from '@/components/all-tags.vue';

export default {
  name: 'Tag',
  mixins: [metadata],
  meta() {
    let title = this.$page.tag.title;
    return {
      title: `Tag: ${title}`,
      description: `All posts about ${title}`,
    };
  },
  components: {
    PostList,
    AllTags,
  },
  computed: {
    posts() {
      return this.$page.tag.belongsTo.posts.map(post => post.meta);
    },
  },
};
</script>
