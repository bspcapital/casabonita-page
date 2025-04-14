import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  i18n: {
    locales: ["en", "es"], // Define supported locales
    defaultLocale: "en",   // Set default locale
  },
};

export default nextConfig;
