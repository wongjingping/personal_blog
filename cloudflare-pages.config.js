// Cloudflare Pages specific configuration

// This is used to configure the build process for Cloudflare Pages
export const cloudflareConfig = {
  // Whether we're in a Cloudflare Pages environment
  isCloudflarePages: process.env.CF_PAGES === '1',
  
  // Whether to use static fallbacks for OG images
  useStaticOgFallbacks: true,
  
  // The base path for static OG images
  staticOgFallbackPath: '/assets/og-fallback',

  // Environment-specific settings
  buildSettings: {
    // Disable native dependencies in Cloudflare environment
    disableNativeDependencies: process.env.CF_PAGES === '1',
  }
};

export default cloudflareConfig; 