/** @type {import('next').NextConfig} */
const nextConfig = {
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
  reactStrictMode: false,
  transpilePackages: [],
}

module.exports = nextConfig
