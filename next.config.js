/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['dnm.nflximg.net', 'i.scdn.co'],
  },
}

module.exports = nextConfig
