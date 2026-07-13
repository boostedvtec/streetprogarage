import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
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
