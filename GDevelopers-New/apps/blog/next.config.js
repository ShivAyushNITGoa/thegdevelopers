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
};

module.exports = nextConfig; 