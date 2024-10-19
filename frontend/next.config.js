/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",  // You can omit this line if no port is needed
        pathname: "/**",  // Allows all paths under the cdn.sanity.io domain
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",  // If you're using localhost during development, specify the port number
        pathname: "/**",  // Allows all paths under localhost
      },
    ],
  },
};

module.exports = nextConfig;
