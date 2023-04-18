/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'avatar.vercel.sh',
      'googleusercontent.com',
      'source.unsplash.com'
    ]
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@tremor/react']
  }
};

module.exports = nextConfig;
