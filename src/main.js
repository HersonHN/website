// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import './assets/scss/style.scss';
import './assets/css/fontello/fontello-embedded.css';
import './assets/css/highlight/tomorrow-night-bright.css';

import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, { router, head, isClient }) {
  head.bodyAttrs = { class: 'system-theme' };
  Vue.component('Layout', DefaultLayout)
}
