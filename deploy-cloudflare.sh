#!/bin/bash
set -e  # Exit on error

echo "🚀 Starting Cloudflare Pages deployment..."

# Check if we should run a production build
IS_PRODUCTION=false
if [ "$1" == "--prod" ] || [ "$1" == "-p" ]; then
  IS_PRODUCTION=true
  ENVIRONMENT="production"
  echo "📡 Running production deployment..."
else
  ENVIRONMENT="preview"
  echo "🔍 Running preview deployment..."
fi

# Step 1: Clean up previous builds
echo "🧹 Cleaning up previous builds..."
rm -rf dist .astro .cloudflare/functions-build

# Step 2: Install dependencies if needed
if [ "$2" == "--fresh" ] || [ "$1" == "--fresh" ]; then
  echo "📦 Installing dependencies..."
  pnpm install --frozen-lockfile
fi

# Step 3: Make sure functions directory exists
if [ ! -d "functions" ]; then
  echo "📁 Creating functions directory..."
  mkdir -p functions
  # Copy any middleware from cloudflare directory
  if [ -f "cloudflare/functions/_middleware.js" ]; then
    echo "📝 Copying middleware functions..."
    cp cloudflare/functions/_middleware.js functions/
  fi
fi

# Step 4: Build the site for Cloudflare Pages
echo "🏗️ Building site for Cloudflare Pages..."
pnpm build

# Step 5: Verify build output
if [ ! -d "dist" ]; then
  echo "❌ Build failed: dist directory not found!"
  exit 1
fi

echo "✅ Build succeeded!"

# Step 6: Deploy to Cloudflare Pages
DEPLOY_CMD="pnpm exec wrangler pages deploy dist --commit-dirty=true"

# Add production flag if needed
if [ "$IS_PRODUCTION" = true ]; then
  DEPLOY_CMD="$DEPLOY_CMD --production"
else
  DEPLOY_CMD="$DEPLOY_CMD --branch=preview"
fi

# Execute deployment command
echo "🚀 Deploying to Cloudflare Pages ($ENVIRONMENT)..."
if command -v pnpm &> /dev/null; then
  eval $DEPLOY_CMD
else
  echo "⚠️ PNPM not found. To deploy, run: $DEPLOY_CMD"
  echo "📂 Your site is built and ready in the 'dist' directory."
fi

echo "🎉 Deployment process completed!"