const fs = require('fs');

const configContent = `/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'randomuser.me',
      'via.placeholder.com',
    ],
  },
};

module.exports = nextConfig;
`;

fs.writeFileSync('next.config.js', configContent, 'utf8');
console.log('next.config.js file created successfully!');
