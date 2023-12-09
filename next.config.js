/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  distDir: "_static",
  eslint: {
    dirs: ["."],
  },
};

module.exports = nextConfig;
