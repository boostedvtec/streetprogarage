import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/remote-tuning",
        destination: "/tuning?type=remote",
        permanent: true,
      },
      {
        source: "/rolling-road",
        destination: "/tuning?type=rolling-road",
        permanent: true,
      },
      {
        source: "/gallery",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
