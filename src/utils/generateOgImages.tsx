import type { CollectionEntry } from "astro:content";
import postOgImage from "./og-templates/post";
import siteOgImage from "./og-templates/site";

// Always use plain SVG for OG images since we're using static build
// This avoids native module issues with Resvg
const svgBufferToPngBuffer = (svg: string) => {
  // Use TextEncoder which is available everywhere
  return new TextEncoder().encode(svg);
};

export async function generateOgImageForPost(post: CollectionEntry<"blog">) {
  try {
    const svg = await postOgImage(post);
    return svgBufferToPngBuffer(svg);
  } catch (err) {
    console.error("Error generating OG image for post:", err instanceof Error ? err.message : String(err));
    return new TextEncoder().encode(""); // Cloudflare-compatible empty buffer
  }
}

export async function generateOgImageForSite() {
  try {
    const svg = await siteOgImage();
    return svgBufferToPngBuffer(svg);
  } catch (err) {
    console.error("Error generating OG image for site:", err instanceof Error ? err.message : String(err));
    return new TextEncoder().encode(""); // Cloudflare-compatible empty buffer
  }
}
