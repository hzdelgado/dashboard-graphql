import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    env: {
        NEXT_PUBLIC_GRAPHQL_API: process.env.NEXT_PUBLIC_GRAPHQL_API,
        PORT: process.env.PORT,
    },
};

export default nextConfig;
