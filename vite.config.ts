import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vitest/config';

// The deployed origin is https://davidblau300.github.io/me/ — storage and the installed app are bound to it.
const BASE_PATH = '/me/';
const APP_BACKGROUND = '#fff6f4';

export default defineConfig({
  base: BASE_PATH,
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon-180x180.png'],
      manifest: {
        name: 'me',
        short_name: 'me',
        lang: 'he',
        dir: 'rtl',
        start_url: BASE_PATH,
        scope: BASE_PATH,
        display: 'standalone',
        background_color: APP_BACKGROUND,
        theme_color: APP_BACKGROUND,
        icons: [
          { src: 'pwa-64x64.png', sizes: '64x64', type: 'image/png' },
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,woff2}'],
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
