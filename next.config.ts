import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  env: {
    NEXT_PUBLIC_API_HOST:
      process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3000",
  },
  images: {
    domains: [
      "flagcdn.com",
      "avatars.githubusercontent.com",
      "upload.wikimedia.org",
    ],
  },
};

export default nextConfig;
