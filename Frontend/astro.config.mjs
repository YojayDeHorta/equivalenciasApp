import { defineConfig } from 'astro/config';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3001,
    host: true
  },
  integrations: [react()]
});