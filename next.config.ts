import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    "API_URL": "https://tools.qa.public.ale.ai/api/tools"
  }
};

export default nextConfig;
