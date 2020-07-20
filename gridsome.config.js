// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Herson Salinas',
  templates: {
    Post: '/:year/:title',
  },
  templates: {
    Tag: '/tags/:id',
  },
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'content/posts/*.md',
        typeName: 'Post',
        route: '/:year/:title',
        refs: {
          tags: {
            typeName: 'Tag',
            route: '/tags/:id',
            create: true
          }
        },
      }
    }
  ],
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.use('vue-svg-loader').loader('vue-svg-loader');
  }
};
