<template>
  <a
    class="tag"
    :href="path"
  >
    {{ tag.title }}
  </a>
</template>

<script>
export default {
  name: 'PostTag',
  props: {
    tag: Object,
    href: String,
  },
  computed: {
    path() {
      if (this.href) {
        return this.href;
      }
      return `/tags/${this.tag.id}`;
    },
  },
};
</script>

<style lang="scss">
$tag-light: lightyellow;
$tag-dark: #efd32a;

.tag {
  $tag-base-size: 0.75rem;
  $radius: 5px;

  display: inline-block;
  position: relative;
  background: $tag-dark;
  padding: 0 $tag-base-size;
  line-height: $tag-base-size * 1.5;
  font-size: $tag-base-size;
  margin-left: $tag-base-size;
  border-radius: $radius;

  color: black !important;
  text-decoration: none;


  &:before {
    content: '';
    display: block;
    position: absolute;
    width: $tag-base-size;
    height: $tag-base-size;
    left: $tag-base-size * -.3;
    top: $tag-base-size * .25;
    transform: rotate(45deg);
    background: $tag-dark;
    border-bottom-left-radius: $radius;
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    width: $tag-base-size * .5;
    height: $tag-base-size * .5;
    top: $tag-base-size * .5;
    left: 0;
    background: $tag-light;
    border-radius: 100%;
  }
}


@mixin tag-light-theme {
  .tag        { background: $tag-dark; }
  .tag:before { background: $tag-dark; }
  .tag:after  { background: white; }
}

@mixin tag-dark-theme {
  .tag        { background: $tag-light; }
  .tag:before { background: $tag-light; }
  .tag:after  { background: black; }
}

.light-theme { @include tag-light-theme; }
.dark-theme  { @include tag-dark-theme; }

@media (prefers-color-scheme: light) { .system-theme { @include tag-light-theme; } }
@media (prefers-color-scheme: dark)  { .system-theme { @include tag-dark-theme; } }
</style>