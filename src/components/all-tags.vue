<template>
  <nav class="content tags">
    <small>Posts by tags:</small>
    <post-tag
      v-for="tag in tags"
      :tag="tag"
      :key="tag.id"
    />
    <post-tag
      href="/posts/"
      :tag="{ title: 'ALL POSTS' }"
    />
  </nav>
</template>

<static-query>
  query Tags {
    allTags: allTag(sortBy: "title", order: ASC) {
      tags: edges {
        meta: node {
          id
          title
        }
      }
    }
  }
</static-query>

<script>
  import PostTag from '@/components/post-tag.vue';

  export default {
    name: 'AllTags',
    components: {
      PostTag,
    },
    computed: {
      tags() {
        return this.$static.allTags.tags
          .map(tag => tag.meta);
      }
    }
  }
</script>
