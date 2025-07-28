/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  async rewrites() {
    return [
      {
        source: '/api/socket/:path*',
        destination: 'https://desstar-chess-server.onrender.com/:path*'
      }
    ]
  }
}

module.exports = nextConfig 