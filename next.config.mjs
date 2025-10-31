/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.thesimpsonsapi.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'annv0r0-study-fullstack-app.s3.ap-south-1.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
