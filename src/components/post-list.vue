<template>
  <section class="content archive-section">
    <h2 class="main-title">
      {{ title }}
    </h2>

    <div
      v-for="post in posts"
      :key="post.id"
    >
      <p class="flex">
        <span class="flex-shrink">
          <span class="date">{{ post.date }}</span>
        </span>
        <span class="flex-grow">
          <a :href="post.path">{{ post.title }}</a>
        </span>
      </p>
    </div>
    <div v-if="posts.length === 0">
      <p>No posts yet.</p>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'PostList',
    props: {
      title: String,
      posts: Array,
    },
  };
</script>

<style lang="scss">

</style>