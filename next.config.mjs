/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Video dosyalarının static olarak serve edilmesini sağla
  async headers() {
    return [
      {
        source: '/videos/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Content-Type',
            value: 'video/mp4',
          },
        ],
      },
    ]
  },
  
  // Static dosyaların doğru şekilde kopyalanmasını sağla
  trailingSlash: false,
  
  // Video dosyalarının build sırasında optimize edilmemesini sağla
  images: {
    unoptimized: true,
  },
  
  // Webpack konfigürasyonu
  webpack: (config, { isServer }) => {
    // Video dosyalarının doğru şekilde handle edilmesini sağla
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|swf|ogv)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/videos/',
          outputPath: 'static/videos/',
          name: '[name].[hash].[ext]',
        },
      },
    })
    
    return config
  },
}

export default nextConfig
