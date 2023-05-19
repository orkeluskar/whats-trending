
const runtimeCaching = require('next-pwa/cache')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['dnm.nflximg.net', 'i.scdn.co'],
  }
}

const withPWA = require('next-pwa')({
  dest: 'public',
  runtimeCaching,
})

module.exports = withPWA({
  ...nextConfig
})
