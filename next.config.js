/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: 'akamai',
    path: '',
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    baseUrl: '/static',
  },
}

module.exports = nextConfig
