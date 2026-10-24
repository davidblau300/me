import { defineConfig, minimal2023Preset } from '@vite-pwa/assets-generator/config';

const APP_BACKGROUND = '#fff6f4';

export default defineConfig({
  preset: {
    ...minimal2023Preset,
    maskable: { ...minimal2023Preset.maskable, resizeOptions: { background: APP_BACKGROUND } },
    apple: { ...minimal2023Preset.apple, resizeOptions: { background: APP_BACKGROUND } },
  },
  images: ['public/icon.svg'],
});
