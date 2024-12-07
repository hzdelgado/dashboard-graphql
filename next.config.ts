import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';

const config = withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
  });

const nextConfig: NextConfig = {
    env: {
        NEXT_PUBLIC_GRAPHQL_API: process.env.NEXT_PUBLIC_GRAPHQL_API,
        PORT: process.env.PORT,
    },
    webpack(config) {
        // Modificaciones adicionales de Webpack si son necesarias
        return config;
    },
};

export default config(nextConfig);
