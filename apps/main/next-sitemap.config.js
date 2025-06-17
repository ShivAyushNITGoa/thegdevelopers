/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://gdevelopers.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/api/' },
      { userAgent: '*', disallow: '/admin/' },
    ],
    additionalSitemaps: [
      'https://gdevelopers.com/blog-sitemap.xml',
      'https://gdevelopers.com/projects-sitemap.xml',
      'https://gdevelopers.com/team-sitemap.xml',
    ],
  },
  exclude: ['/api/*', '/admin/*', '/server-sitemap.xml'],
  outDir: 'public',
  generateIndexSitemap: true,
  alternateRefs: [
    {
      href: 'https://gdevelopers.com/en',
      hreflang: 'en',
    },
    {
      href: 'https://gdevelopers.com/es',
      hreflang: 'es',
    },
  ],
  transform: async (config, path) => {
    // Custom transformation logic for each URL
    // For example: different change frequency for different paths
    
    if (path.startsWith('/blog/')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }
    
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }
    
    return {
      loc: path,
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };
  },
}; 