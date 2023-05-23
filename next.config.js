
const runtimeCaching = require('next-pwa/cache')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'dnm.nflximg.net',
      'i.scdn.co',
      'i.ytimg.com',
      'pbs.twimg.com',
      'a.thumbs.redditmedia.com',
      'b.thumbs.redditmedia.com',
      'external-preview.redd.it'
    ],
  }
}

const withPWA = require('next-pwa')({
  dest: 'public',
  runtimeCaching,
})

module.exports = withPWA({
  ...nextConfig
})
