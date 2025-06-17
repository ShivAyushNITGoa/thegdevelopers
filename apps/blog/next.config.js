/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["ui", "config"],
  basePath: '/blog',
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'x-app-name',
            value: 'blog',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Handle routing for blog posts
        {
          source: '/posts/:id',
          destination: '/blog/posts/:id',
        },
      ],
    };
  },
};

module.exports = nextConfig; 