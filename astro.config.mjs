// @ts-check
import { defineConfig } from "astro/config";
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [preact({ compat: true }), tailwind()],
  prefetch: {
      prefetchAll: true,
      defaultStrategy: "viewport",
    },
  output: "server",
  adapter: vercel(),
});