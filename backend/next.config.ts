import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Only API routes; no UI pages needed in this service
  serverExternalPackages: ["@prisma/client", "bcryptjs"],
};

export default nextConfig;
