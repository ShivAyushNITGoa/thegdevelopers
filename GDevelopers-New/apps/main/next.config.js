/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["ui", "config", "design-system"],
  async rewrites() {
    return [
      {
        source: '/blog',
        destination: 'http://localhost:3001/blog',
      },
      {
        source: '/blog/:path*',
        destination: 'http://localhost:3001/blog/:path*',
      },
      {
        source: '/projects',
        destination: 'http://localhost:3002/projects',
      },
      {
        source: '/projects/:path*',
        destination: 'http://localhost:3002/projects/:path*',
      },
      {
        source: '/team',
        destination: 'http://localhost:3003/team',
      },
      {
        source: '/team/:path*',
        destination: 'http://localhost:3003/team/:path*',
      },
      {
        source: '/contact',
        destination: 'http://localhost:3004/contact',
      },
      {
        source: '/contact/:path*',
        destination: 'http://localhost:3004/contact/:path*',
      },
    ];
  },
};

module.exports = nextConfig; 