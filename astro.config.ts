import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import cloudflare from '@astrojs/cloudflare';
import { SITE } from "./src/config";

// Check if we need a static build
const useStaticBuild = true; // Set to false if you want SSR

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    sitemap(),
  ],
  // Use static output for simpler Cloudflare deployment
  output: useStaticBuild ? "static" : "server",
  ...(useStaticBuild ? {} : { adapter: cloudflare() }),
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      }
    },
  },
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      themes: { light: "min-light", dark: "night-owl" },
      wrap: true,
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
    ssr: {
      noExternal: ["@resvg/resvg-js"],
    },
  },
  scopedStyleStrategy: "where",
});
