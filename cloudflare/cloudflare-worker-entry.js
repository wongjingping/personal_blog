// Polyfill MessageChannel which is needed by React SSR
if (typeof globalThis.MessageChannel === 'undefined') {
  globalThis.MessageChannel = class MessageChannel {
    constructor() {
      this.port1 = {
        onmessage: null,
        postMessage: (message) => {
          if (this.port2.onmessage) {
            queueMicrotask(() => {
              this.port2.onmessage({ data: message });
            });
          }
        },
        close: () => {}
      };
      
      this.port2 = {
        onmessage: null,
        postMessage: (message) => {
          if (this.port1.onmessage) {
            queueMicrotask(() => {
              this.port1.onmessage({ data: message });
            });
          }
        },
        close: () => {}
      };
    }
  };
}

// Import other shims
import './cloudflare-shims.js';

// This is the entry point for Cloudflare Pages
export { default } from './entry.js';