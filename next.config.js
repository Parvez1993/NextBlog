/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = {
  nextConfig,
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    mongodburl: process.env.DATABASE_LOCAL,
  },
};
