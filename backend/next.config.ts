import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Only API routes; no UI pages needed in this service
  serverExternalPackages: ["@prisma/client", "bcryptjs"],
  // CORS is handled per-request in middleware.ts — credentialed CORS must reflect
  // the request origin, which static headers here cannot do.
};

export default nextConfig;
