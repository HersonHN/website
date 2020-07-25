// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Herson Salinas',
  titleTemplate: '%s',
  siteUrl: siteURL(),
  templates: {
    Post: '/:year/:fileInfo__name',
    Tag: '/tags/:id',
  },
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Post',
        path: 'content/posts/*.md',
        refs: {
          tags: {
            typeName: 'Tag',
            create: true
          }
        },
        remark: {
          plugins: [
            '@gridsome/remark-prismjs',
          ],
        },
      },
    },
    {
      use: '@gridsome/plugin-sitemap',
    },
  ],
  chainWebpack: config => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule.use('vue-svg-loader').loader('vue-svg-loader');
  }
};

function siteURL() {
  return process.env.NODE_ENV === 'production'
    ? 'https://www.herson.hn/'
    : 'http://localhost:8080';
}
