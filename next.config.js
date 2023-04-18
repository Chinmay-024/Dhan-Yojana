/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false
      };
    }

    return config;
  },
  reactStrictMode: true,
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'avatar.vercel.sh',
      'googleusercontent.com',
      'source.unsplash.com',
      'lh3.googleusercontent.com'
    ]
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@tremor/react', 'mysql2']
  }
};

module.exports = nextConfig;
