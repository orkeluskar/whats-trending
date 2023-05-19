/** @type {import('next-sitemap').IConfig} */
const siteMapConfig = {
  siteUrl: 'https://whats-trending.vercel.app/',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/404']
}

module.exports = siteMapConfig
