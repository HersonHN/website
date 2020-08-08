<template>
  <span class="link-wrapper">
    <component
      class="link"
      :class="{ active }"
      :href="active ? null : this.to"
      :is="active ? 'span' : 'a'"
    >
      <slot />
    </component>
  </span>
</template>

<script>
  export default {
    name: 'ALink',
    props: {
      to: {
        type: String,
        required: true,
      },
    },
    computed: {
      active() {
        return trailess(this.to) === trailess(this.$route.path);
      },
    },
  }

  function trailess(link = '') {
    return link.replace(/\/$/, '');
  }
</script>

<style lang="scss" scope>
  .link-wrapper::after {
    content: " | ";
  }
  .link-wrapper:last-child::after {
    content: "";
  }

  .link.active:hover {
    color: inherit;
    cursor: default;
  }
</style>
