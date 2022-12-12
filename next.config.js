module.exports = {
  // reactStrictMode: true,
  // swcMinify: true,  
  // Adding policies:
  async headers() {
    return [
        {
          source: '/(.*)',
          headers: [
            // {
            //   key: 'X-Frame-Options',
            //   value: 'DENY',
            // },
            // {
            //   key: 'Content-Security-Policy',
            //   value:
            //     "default-src * ; image-src 'https://unsplash.com'; script-src * ;font-src 'self' 'https://fonts.googleapis.com'",
            // },
            // {
            //   key: 'X-Content-Type-Options',
            //   value: 'nosniff',
            // },
            // {
            //   key: 'Permissions-Policy',
            //   value: "camera=(); battery=(self); geolocation=(); microphone=(self); payment=(); usb=() gyroscope=(); magnetometer=(); accelerometer=(); ",
            // },
            // {
            //   key: 'Referrer-Policy',
            //   value: 'origin-when-cross-origin',
            // },
          ],
        },
      ];
  },   
  async rewrites() {
    return [
      {
        source: '/admin',
        destination: '/admin/index.html',
      },
    ]
  },
}