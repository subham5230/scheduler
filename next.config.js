/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER_URI: process.env.SERVER_URI
  }
}

module.exports = nextConfig
