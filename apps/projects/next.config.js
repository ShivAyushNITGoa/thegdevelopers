/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/projects',
      },
    ];
  },
};

module.exports = nextConfig; 