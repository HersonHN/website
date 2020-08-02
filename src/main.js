// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import 'prismjs/themes/prism-okaidia.css';

import './assets/scss/style.scss';
import './assets/css/fontello/fontello-embedded.css';

import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, { router, head, isClient }) {
  head.link.push({
    rel: 'alternate',
    type: 'application/rss+xml',
    href: '/feed.xml',
  });

  Vue.component('Layout', DefaultLayout);
}
