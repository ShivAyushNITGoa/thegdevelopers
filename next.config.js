/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { 
    domains: ['images.unsplash.com', 'randomuser.me'],
    unoptimized: true
  }
};

module.exports = nextConfig;
