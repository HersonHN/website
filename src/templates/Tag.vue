<template>
  <Layout>
    <post-list
      :title="title"
      :posts="posts"
    />
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
        edges {
          node {
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

  export default {
    name: 'Tag',
    metaInfo () {
      return {
        title: this.title,
      }
    },
    components: {
      PostList,
    },
    computed: {
      title() {
        return 'Tag: ' + this.$page.tag.title;
      },
      posts() {
        return this.$page.tag.belongsTo.edges.map(edge => edge.node);
      },
    },
  }
</script>

<style lang="scss">

</style>