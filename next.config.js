module.exports = {
  // reactStrictMode: true,
  // swcMinify: true,  
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
      },
    ]
  },
}