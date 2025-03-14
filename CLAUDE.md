# CLAUDE.md - Development Guidelines

## Build Commands
- 🚀 Development: `pnpm dev`
- 🏗️ Build: `pnpm build`
- 🔍 Lint: `pnpm lint`
- ✨ Format: `pnpm format`
- 🔄 Preview: `pnpm preview`
- 📦 Deploy to Cloudflare: `pnpm cloudflare:deploy`

## Code Style
- TypeScript for all new code (`.ts`, `.tsx`)
- Double quotes (`"`) for strings
- Semicolons required
- 2-space indentation
- 80 character line limit
- Arrow functions with implicit return when possible
- React: use functional components with hooks
- Astro: follow `.astro` component patterns
- Tailwind for styling

## Project Structure
- `/src/pages`: Page components (Astro)
- `/src/components`: Reusable UI components
- `/src/layouts`: Page layout templates
- `/src/content/blog`: Blog post markdown files
- `/src/utils`: Helper functions and utilities

## Cloudflare Compatibility
- Avoid Node-specific APIs that don't work in Cloudflare
- Use environment detection for different platforms
- Test deployments locally with `pnpm cloudflare:dev`