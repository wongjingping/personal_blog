// Node.js API shims for environments like Cloudflare that don't support Node.js APIs

// Handle missing process global
if (typeof process === 'undefined') {
  globalThis.process = {
    env: {},
    nextTick: queueMicrotask
  };
}

// Buffer polyfill
if (typeof Buffer === 'undefined') {
  globalThis.Buffer = {
    from: (data, encoding) => {
      if (typeof data === 'string') {
        return new TextEncoder().encode(data);
      }
      // For binary data or other encodings, return empty Uint8Array
      return new Uint8Array();
    },
    isBuffer: () => false
  };
}

// URL compatibility
if (typeof URL === 'undefined' && typeof globalThis.URL !== 'undefined') {
  globalThis.URL = URL;
}

// Path module shim (minimal implementation)
export const path = {
  dirname: (path) => {
    const parts = path.split('/');
    parts.pop();
    return parts.join('/') || '.';
  },
  join: (...parts) => {
    return parts.join('/').replace(/\/+/g, '/');
  },
  resolve: (...parts) => {
    return parts.join('/').replace(/\/+/g, '/');
  },
  extname: (path) => {
    const match = /\.[^./\\]*$/.exec(path);
    return match ? match[0] : '';
  }
};

export default {
  path
};