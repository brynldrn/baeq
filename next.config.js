/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack']
    });

    // resolve paths for shortcuts
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    config.resolve.alias['@components'] = path.resolve(__dirname, 'src/components');
    config.resolve.alias['@pages'] = path.resolve(__dirname, 'src/pages');
    config.resolve.alias['@lib'] = path.resolve(__dirname, 'src/lib');
    config.resolve.alias['@styles'] = path.resolve(__dirname, 'src/styles');
    config.resolve.alias['@public'] = path.resolve(__dirname, 'public');

    return config;
  },
  images: {
    domains: ['media.graphassets.com', 'picsum.photos']
  },
  swcMinify: true,
}

module.exports = nextConfig
