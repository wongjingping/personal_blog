// Cloudflare Pages middleware
// This handles requests before they reach your Astro site

// This middleware enforces HTTPS and handles redirects
export async function onRequest({ request, next, env }) {
  // Force HTTPS in production
  const url = new URL(request.url);
  if (env.ENVIRONMENT === "production" && url.protocol === "http:") {
    url.protocol = "https:";
    return Response.redirect(url.toString(), 301);
  }

  // Continue to the next middleware or to the Astro site
  return next();
}