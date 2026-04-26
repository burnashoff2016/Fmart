import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  turbopack: {
    root: __dirname,
  },
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
