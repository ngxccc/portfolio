import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    qualities: [75, 90],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
