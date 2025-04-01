import { defineConfig, mergeConfig } from 'vite';
import { defineConfig as defineVitestConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import biomePlugin from "vite-plugin-biome";

// https://vite.dev/config/
const viteConfig = defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    biomePlugin({ mode: "check", files: ".", applyFixes: true })
  ]
});

const vitestConfig = defineVitestConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
});

export default mergeConfig(viteConfig, vitestConfig);