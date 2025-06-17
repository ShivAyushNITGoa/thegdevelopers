/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["ui", "config", "ab-testing", "accessibility", "analytics", "api", "auth", "caching", "i18n", "performance", "seo"],
  images: {
    domains: [
      'images.unsplash.com',
      'randomuser.me',
      'via.placeholder.com',
    ],
  },
  async rewrites() {
    return {
      afterFiles: [
        // Route to the blog app
        {
          source: '/blog',
          destination: 'http://localhost:3001/blog',
        },
        {
          source: '/blog/:path*',
          destination: 'http://localhost:3001/blog/:path*',
        },
        // Route to the auth app
        {
          source: '/auth',
          destination: 'http://localhost:3002/auth',
        },
        {
          source: '/auth/:path*',
          destination: 'http://localhost:3002/auth/:path*',
        },
        // Route to the docs app
        {
          source: '/docs',
          destination: 'http://localhost:3003/docs',
        },
        {
          source: '/docs/:path*',
          destination: 'http://localhost:3003/docs/:path*',
        },
        // Route to the contact app
        {
          source: '/contact',
          destination: 'http://localhost:3004/contact',
        },
        {
          source: '/contact/:path*',
          destination: 'http://localhost:3004/contact/:path*',
        },
        // Route to the team app
        {
          source: '/team',
          destination: 'http://localhost:3005/team',
        },
        {
          source: '/team/:path*',
          destination: 'http://localhost:3005/team/:path*',
        },
        // Route to the projects app
        {
          source: '/projects',
          destination: 'http://localhost:3006/projects',
        },
        {
          source: '/projects/:path*',
          destination: 'http://localhost:3006/projects/:path*',
        },
      ],
    };
  },
};

module.exports = nextConfig; 