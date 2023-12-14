/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.intra.42.fr", "i.imgur.com", "10.13.2.9"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, options) => {
    if (options.isServer) {
      config.infrastructureLogging = { level: "error" };
    }
    return config;
  },
};

module.exports = nextConfig;
