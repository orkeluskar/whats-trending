/** @type {import('next-sitemap').IConfig} */
const siteMapConfig = {
  siteUrl: 'https://trendzy.app/',
  generateRobotsTxt: true,
  changefreq: 'hourly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/404']
}

module.exports = siteMapConfig
