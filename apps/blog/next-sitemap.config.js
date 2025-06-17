/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://gdevelopers.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/draft/'],
      },
    ],
    additionalSitemaps: [
      'https://gdevelopers.com/blog/sitemap.xml',
      'https://gdevelopers.com/blog/tags-sitemap.xml',
      'https://gdevelopers.com/blog/authors-sitemap.xml',
    ],
  },
  exclude: ['/admin/*', '/api/*', '/draft/*'],
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  generateIndexSitemap: true,
  outDir: 'public',
  transform: async (config, path) => {
    // Custom transform function for blog posts
    if (path.startsWith('/blog/')) {
      // Higher priority for blog posts
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }
    
    // Default transformation for other pages
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
}; 