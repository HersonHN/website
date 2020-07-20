<template>
  <Layout>
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
      title
      belongsTo(page: 1, perPage: 100) @paginate {
        pageInfo {
          totalPages
          currentPage
        }
        posts: edges {
          meta: node {
            ... on Post {
              id
              path
              title
              date (format: "YYYY-MM-DD")
              description
            }
          }
        }
      }
    }
  }
</page-query>

<script>
  import PostList from '@/components/post-list.vue';
  import AllTags from '@/components/all-tags.vue';

  export default {
    name: 'Tag',
    metaInfo () {
      return {
        title: this.title,
      }
    },
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
    },
  }
</script>
