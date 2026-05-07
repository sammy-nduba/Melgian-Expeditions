/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.100.12'],
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
