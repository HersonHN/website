<template>
  <header
    class="site-header bg-color"
    :class="{
      'banner blur': hasBanner
    }"
    :style="{
      'background-image': pageBanner
    }"
  >
    <div v-if="!forceTheme">
      <div v-html="nastyCode"></div>
    </div>
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
        <change-theme-button
          v-if="!forceTheme"
          target="#app"
        />
      </div>
    </div>
  </header>
</template>

<script>
import ChangeThemeButton from 'change-theme-button';

// Forcing this to be the first code to be executed when the page is compiled
// that way it avoids the page to be fully loaded to set the theme, it's just
// some milliseconds in difference but without it it's more noticeable when
// the theme changes in the page load.
const nastyCode = `
  [[script]]
    if (localStorage.getItem('theme')) {
      let element = document.getElementById('app');
      element.classList.remove('light-theme', 'dark-theme', 'system-theme');
      element.classList.add(localStorage.getItem('theme'));
    }
  [[/script]]
  `
  .replace(/\[\[/g, '<')
  .replace(/\]\]/g, '>');


export default {
  name: 'PageHeader',
  props: {
    page: {
      type: Object,
      required: false,
      default() { return {}; },
    },
    layout: {
      type: String,
      required: false,
      default: '',
    },
    forceTheme: {
      type: String,
      required: false,
      default: '',
    },
  },

  data() {
    return { nastyCode };
  },

  components: {
    ChangeThemeButton,
  },

  computed: {
    hasBanner() {
      if (!this.page.meta) return;
      return Boolean(this.page.meta.banner);
    },
    pageBanner() {
      if (!this.hasBanner) {
        return null;
      }
      return `url('${this.page.meta.pageBanner}')`;
    },
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

  .change-theme-container button {
    line-height: 1rem;
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