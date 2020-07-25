<template>
  <Layout :page="page">
    <post-list
      :title="title"
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

    components: {
      PostList,
      AllTags,
    },
    computed: {
      title() {
        return 'Tag: ' + this.$page.tag.title;
      },
      posts() {
        return this.$page.tag.belongsTo.posts.map(post => post.meta);
      },
      description() {
        return 'All posts about ' + this.$page.tag.title;
      },
      path() {
        return this.$page.tag.path;
      },
    },
  }
</script>
