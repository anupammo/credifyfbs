import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Only API routes; no UI pages needed in this service
  serverExternalPackages: ["@prisma/client", "bcryptjs"],
  
  async headers() {
    return [
      {
        // Apply CORS headers to all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, PATCH, DELETE, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization, X-Credify-Signature" },
          { key: "Access-Control-Max-Age", value: "86400" },
        ],
      },
    ];
  },
};

export default nextConfig;
