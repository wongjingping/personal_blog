// Worker entry point for Cloudflare Pages
// This imports the Astro/Cloudflare adapter code

// Import shims first to ensure polyfills are available
import './cloudflare-shims.js';

// Re-export the default export from entry.js
export { default } from './entry.js';