/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Redirect legacy URLs to new SPA routes to preserve external links
  async redirects() {
    return [
      { source: '/product/:slug', destination: '/products/:slug', permanent: true },
    ]
  },
}

export default nextConfig
