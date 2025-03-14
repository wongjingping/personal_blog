# Cloudflare Pages Deployment Guide

This document outlines how to work with Cloudflare Pages for this project.

## Folder Structure

```
├── cloudflare/               # Cloudflare-specific code
│   ├── functions/            # Cloudflare Functions (middleware, etc.)
│   ├── cloudflare-shims.js   # Polyfills for Cloudflare environment
│   └── worker.js             # Worker entry point
├── functions/                # Deployed Functions directory
│   └── _middleware.js        # Middleware for handling requests
├── public/                   # Static assets
│   └── _routes.json          # Cloudflare routing configuration
└── dist/                     # Build output (not checked into git)
```

## Commands

### Development

```bash
# Run local development server
pnpm dev

# Preview with Wrangler (after building)
pnpm build
pnpm cloudflare:dev
```

### Deployment

```bash
# Deploy to preview branch
pnpm cloudflare:deploy

# Deploy to production
pnpm cloudflare:deploy:prod

# Manual deployment with wrangler
pnpm exec wrangler pages deploy dist
```

## Configuration Files

- `wrangler.toml` - Wrangler CLI configuration
- `cloudflare-pages.config.js` - Project-specific Cloudflare settings
- `public/_routes.json` - Cloudflare Pages routing configuration

## Important Notes

1. **Static Site Generation**: We're using static site generation (SSG) instead of server-side rendering (SSR) to avoid issues with MessageChannel in Cloudflare Workers.

2. **Dynamic Routes**: All dynamic routes have `export const prerender = true` and `getStaticPaths()` functions to ensure proper static generation.

3. **Functions**: Cloudflare Pages Functions are stored in the `functions/` directory. Any middleware or API handlers should be placed there.

4. **Environment Variables**: 
   - Set environment variables in the Cloudflare Dashboard
   - For local development, use `.dev.vars` files

## Troubleshooting

- If OG images don't render correctly, check `src/utils/generateOgImages.tsx`
- If deployment fails, check the logs with `wrangler pages deployment tail`
- For local development issues, try `wrangler pages dev dist --local`