// Astro Cloudflare adapter entry point

import { createExports } from '@astrojs/cloudflare/server.js';
import { default as App } from './cloudflare-entry.js';

export default createExports(App);