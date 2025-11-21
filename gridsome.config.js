// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const path = require('path');

module.exports = {
  siteName: 'Herson Salinas',
  titleTemplate: '%s',
  siteUrl: siteURL('/'),
  templates: {
    Post: '/:year/:fileInfo__name',
    Tag: '/tags/:id',
  },
  plugins: [
    {
      use: '@kriya/gridsome-source-filesystem',
      options: {
        typeName: 'Post',
        path: 'content/posts/*.md',
        refs: {
          tags: {
            typeName: 'Tag',
            create: true,
          },
        },
        remark: {
          plugins: ['@kriya/gridsome-remark-prismjs'],
        },
      },
    },
  ],
  chainWebpack (config) {
    // Load variables for all vue-files
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']

    types.forEach(type => {
      addStyleResource(config.module.rule('scss').oneOf(type))
    })
  }
}


function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/scss/*.scss'),
      ],
    })
}

function siteURL(prefix = '') {
  return process.env.NODE_ENV === 'production'
    ? 'https://www.herson.hn' + prefix
    : 'http://localhost:8080' + prefix;
}
