// Provide shims for Node.js APIs missing in Cloudflare Workers

// Important: MessageChannel is now defined in cloudflare-worker-entry.js to ensure it's available
// before any imports that might need it. Do not define it here.

// Buffer shim for OG image generation
if (typeof Buffer === 'undefined') {
  globalThis.Buffer = {
    from: (str, encoding) => {
      if (encoding === 'utf8' || encoding === 'utf-8') {
        return new TextEncoder().encode(str);
      }
      // Return empty Uint8Array for other encodings
      return new Uint8Array();
    },
    isBuffer: () => false
  };
}

// Crypto shim
if (typeof crypto === 'undefined' && typeof globalThis.crypto !== 'undefined') {
  globalThis.crypto = crypto;
}

// Stream shim (minimal implementation)
if (typeof globalThis.process === 'undefined') {
  globalThis.process = {
    env: {},
    nextTick: queueMicrotask
  };
}

export default {};