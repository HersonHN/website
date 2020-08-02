<template>
  <Layout>
    <post-list
      :title="$options.meta.title"
      :posts="posts"
    />
    <template v-slot:post-content>
      <all-tags />
    </template>
  </Layout>
</template>

<static-query>
  query Posts {
    allPost(sortBy: "date") {
      posts: edges {
        meta: node {
          title, path, description
          date (format: "YYYY-MM-DD")
          tags (sortBy: "title ASC") { id, title, }
        }
      }
    }
  }
</static-query>

<script>
import metadata from '@/mixins/metadata';
import PostList from '@/components/post-list.vue';
import AllTags from '@/components/all-tags.vue';

export default {
  name: 'Posts',
  mixins: [metadata],
  meta: {
    title: 'All Posts',
    description: 'All posts',
  },
  components: {
    PostList,
    AllTags,
  },
  computed: {
    posts() {
      return this.$static.allPost.posts.map(post => post.meta);
    },
  },
};
</script>
