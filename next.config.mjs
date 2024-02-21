/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['assets.tmecosys.com', 'www.thecandidcooks.com', 'www.vmcdn.ca', 'images.squarespace-cdn.com', 'i0.wp.com'], 
  },

};

export default nextConfig;
