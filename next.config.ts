import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  middleware: {
    '/dashboard': ['./middleware.ts'], // Solo se aplica en rutas de dashboard
  },
};

export default nextConfig;
