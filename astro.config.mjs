// @ts-check
import { defineConfig } from "astro/config";
import node from "@astrojs/node";
import preact from "@astrojs/preact";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
// import preact from '@astrojs/preact';
// import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
	integrations: [preact({ compat: true }), tailwind()],
	output: "server",
	adapter: vercel(),
});
