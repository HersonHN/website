<template>
  <header
    class="site-header bg-color"
    :class="{
      'banner blur': page.layout === 'post',
    }"
    :style="{
      'background-image': page.slug ? `url('/assets/img/banners/${ page.slug }@banner.png')` : ''
    }"
  >
    <div class="flex header-inner">
      <div class="flex-grow">
        <nav class="center">
          <span class="bg-color rounded">
            <a href="/">Home</a> |
            <a href="/posts">Posts</a>
          </span>
        </nav>
      </div>
      <div class="flex-shrink change-theme-container">
        <change-theme v-if="!page.forceTheme" />
      </div>
    </div>
  </header>
</template>

<script>
  import ChangeTheme from 'change-theme-button/vue/change-theme';

  export default {
    name: 'PageHeader',
    props: {
      page: {
        type: Object,
        required: false,
        default() { return {}; },
      },
      site: {
        type: Object,
        required: false,
        default() { return {}; },
      },
      posts: {
        type: Array,
        required: false,
        default() { return []; },
      },
    },

    components: {
      ChangeTheme,
    },
  }
</script>

<style lang="scss">
  @import '../assets/scss/variables';

  .site-header {
    padding: 0;

    .header-inner {
      border-top: 5px solid crimson;
      padding: 0.5rem 1rem;
    }

    .change-theme-container {
      min-width: 32px;
      min-height: 32px;
    }

    &.banner {
      min-height: 15rem;
      transition: min-height 1s linear;
      background-position: center top;
      background-size: cover;
    }

    .rounded {
      display: inline-block;
      padding: .5rem 1rem;
      border-radius: 10px;
    }
  }

  .site-header.sticky {
    position: sticky;
    z-index: 2;
    top: 0px;

    .header-inner {
      position: sticky;
      top: 0px;
    }

    &.banner {
      top: -11rem;
    }
  }

  @media (orientation: portrait) {
    .site-header.banner {
      min-height: 25rem;
    }

    .site-header.banner.sticky {
      top: -21rem;
    }
  }

  // Blurred line at the bottom of banners

  @mixin blur-shadow($color) {
    .site-header.banner.blur {
      box-shadow: inset 0px -5px 5px 0px $color;
    }
  }

  .light-theme { @include blur-shadow($background); }
  .dark-theme { @include blur-shadow($foreground); }
  .system-theme { @include blur-shadow($background); }

  @media (prefers-color-scheme: dark)  {
    .system-theme { @include blur-shadow($foreground); }
  }
</style>