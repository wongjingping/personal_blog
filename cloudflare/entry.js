// Astro Cloudflare adapter entry point

import { createExports } from '@astrojs/cloudflare/server.js';
import './cloudflare-shims.js';

// Simple mock application for static site
const StaticApp = {
  fetch: (request, env, ctx) => {
    // For static sites, the actual handling is done by Cloudflare Pages
    return new Response("Static site handler", { status: 200 });
  }
};

export default createExports(StaticApp);