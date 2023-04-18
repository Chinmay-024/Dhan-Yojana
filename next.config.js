/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'avatar.vercel.sh',
      'lh3.googleusercontent.com'
    ]
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@tremor/react', 'mysql2']
  }
};

module.exports = nextConfig;
