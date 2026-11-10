// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';
import designRoutes from './src/designs/integration.ts';

export default defineConfig({
  site: 'https://onurcakmakceng.github.io',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react(), designRoutes()],
});
