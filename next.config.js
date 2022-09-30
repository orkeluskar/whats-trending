/** @type {import('next').NextConfig} */

const runtimeCaching = require('next-pwa/cache')

// const nextConfig = withPWA({
//   pwa: {
//     // reactStrictMode: true,
//     // swcMinify: true,
//     dest: 'public',
//     runtimeCaching,
//   },
// })

// module.exports = withPWA({
//   pwa: {
//     dest: 'public',
//     runtimeCaching,
//   },
// })



const withPWA = require('next-pwa')({
  dest: 'public',
  runtimeCaching
})

module.exports = withPWA()
