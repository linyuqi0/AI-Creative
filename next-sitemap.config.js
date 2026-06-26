/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://linyuqi0.github.io/AI-Creative',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: 'out',
};
